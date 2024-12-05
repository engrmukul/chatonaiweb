// src/ChatInput.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import StopIcon from '@mui/icons-material/Stop';
import usePostData, { cancelPostDataRequest } from "../library/hooks/usePostData";
import { endpoints } from "../library/share/endpoints";
import { getJwtToken } from "../library/functions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import AiType from "./enums/AiTypeEnum";
import { FaFile } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { IoMdMicOff } from "react-icons/io";
import useFetchData from "../library/hooks/useFetchData";
import { BiSolidFilePdf } from "react-icons/bi";
import { TbFileSpreadsheet } from "react-icons/tb";
import { FaFileWord } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

const ChatInput = ({ onSend, searchParams, setIsLoading, isResponseLoading, isTyping, setIsTyping, handleStopTyping }) => {

  const customPrompt = searchParams.get("prompt");
  const promptId = searchParams.get("id");
  const aiType = searchParams.get("type");
  const [message, setMessage] = useState(customPrompt || "");

  const { mutate } = usePostData(endpoints.createAI);
  const { mutate: fileupload } = usePostData(endpoints.fileUpload);
  const userToken = getJwtToken();

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileIcon, setFileIcon] = useState(false);
  const [fileDetails, setFileDetails] = useState({});
  const [error, setError] = useState(false);

  const [packages, setPackages] = useState({
    free: [],
    paid: [],
  });
  const { data, isLoading } = useFetchData(endpoints.getAllPrompts);

  useEffect(() => {
    if (data?.data) {
      const freePackages = [];
      const paidPackages = [];

      data?.data.forEach((item) => {
        if (item.packageType === "FREE") {
          freePackages.push(item);
        } else if (item.packageType === "PAID") {
          paidPackages.push(item);
        }
      });

      setPackages({ free: freePackages, paid: paidPackages });
    }
  }, [data]);

  const ImageToTextPromt = packages.paid.find(
    (item) => item.aiType == AiType.IMAGETOTEXT
  );


  const handleChange = (event) => {
    setError(false)
    setMessage(event.target.value);
  };

  const validateYouTubeLink = (message) => {
    const youtubeRegex = /^(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S+?[?&]v=|.*[?&]v=)([A-Za-z0-9_-]+)|youtu\.be\/([A-Za-z0-9_-]+)))/;
    return youtubeRegex.test(message);
  };

  const handleSend = async (isSecondCall, processedMessage = "") => {
    // Example usage:
    if (aiType === AiType.YOUTUBE_LINK) {
      if (validateYouTubeLink(message)) {
      } else {
        setError(true)
        return;
      }
    }

    setIsTyping(true)

    if (
      aiType == AiType.IMAGETOTEXT ||
      aiType == AiType.FILES ||
      (aiType == AiType.TRANSLATION && file != null && !isSecondCall) ||
      (aiType == AiType.SUMMARIZATION && file != null && !isSecondCall)
    ) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        // onSend({ type: "sent", text: message });
        fileupload(
          {
            data: formData,
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          },
          {
            onSuccess: (response) => {
              // onSend({
              //   type: "sent", text: (AiType.FILES || aiType == AiType.IMAGETOTEXT) ? response.data.url : ""
              // });
              if (aiType == AiType.IMAGETOTEXT) {
                onSend({
                  type: "sent", text: response.data.url
                });
              } else if (file && !file.type.startsWith("image/")) {
                onSend({ type: "sent", text: JSON.stringify(fileDetails) })
              }
              onSend({ type: "sent", text: message });
              setIsLoading(true)
              setImagePreview(null); //Removing file after upload
              setFileIcon(false);
              setFile(null); //Removing file after upload
              mutate(
                {
                  data: {
                    customPrompt:
                      aiType == AiType.TRANSLATION ||
                        aiType == AiType.SUMMARIZATION
                        ? ImageToTextPromt.prompt
                        : message,
                    promptId:
                      aiType == AiType.TRANSLATION ||
                        aiType == AiType.SUMMARIZATION
                        ? ImageToTextPromt._id
                        : promptId,
                    stream: false,
                    voice: "alloy",
                    customFileUrl:
                      aiType == AiType.FILES
                        ? response.data.filename
                        : response.data.url,
                    fileId: response.data._id
                  },
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                  },
                },
                {
                  onSuccess: (response) => {
                    setIsLoading(false)
                    if (
                      (aiType == AiType.TRANSLATION ||
                        aiType == AiType.SUMMARIZATION) &&
                      response.message.text
                    ) {
                      setMessage(response.message.text);
                      handleSend(true, response.message.text);
                    } else if (response.message.text) {
                      onSend({ type: "recieved", text: response.message.text });
                    } else if (response.message.summeriz) {
                      // onSend("AI: " + response.message.summeriz);
                      onSend({
                        type: "recieved",
                        text: response.message.summeriz,
                      });
                    } else if (response.message.translate) {
                      // onSend("AI: " + response.message.translate);
                      onSend({
                        type: "recieved",
                        text: response.message.translate,
                      });
                    } else if (response.message.imageUrl) {
                      // onSend("AI: " + response.message.imageUrl);
                      onSend({
                        type: "recieved",
                        text: response.message.imageUrl,
                      });
                    }
                  },
                  onError: (error) => {
                    setIsLoading(false)
                    // onSend("ME: " + customPrompt);
                    // onSend("ME: " + message);
                    // onSend("AI: " + error);
                    onSend({ type: "recieved", text: error.response.data.message });
                  },
                }
              );
              setMessage("");
              // }
            },
            onError: (error) => {
              setIsLoading(false)
              onSend({ type: "recieved", text: error.response.data.message })
              setMessage("");
              console.log("file___ERROR", error);
            },
          }
        );
      } catch (error) {
        setIsLoading(false)
        console.error("Error uploading file", error);
      }
    } else {
      try {
        if (message.trim()) {
          !isSecondCall && onSend({ type: "sent", text: message });
          setIsLoading(true)
          mutate(
            {
              data: {
                customPrompt: message + `${processedMessage}`,
                promptId: promptId,
                // size: "512",
                // size: "1024x1792", //For image
                // stream: true,
                stream: false,
                voice: "alloy",
                customFileUrl: aiType === AiType.YOUTUBE_LINK ? message : "",
              },
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            },
            {
              onSuccess: (response) => {
                setIsLoading(false)
                if (response.message.text) {
                  onSend({ type: "recieved", text: response.message.text });
                } else if (response.message.summeriz) {
                  onSend({ type: "recieved", text: response.message.summeriz });
                } else if (response.message.translate) {
                  onSend({
                    type: "recieved",
                    text: response.message.translate,
                  });
                } else if (response.message.imageUrl) {
                  onSend({ type: "recieved", text: response.message.imageUrl });
                }
              },
              onError: (error) => {
                setIsLoading(false)
                // onSend("ME: " + customPrompt);
                // onSend("ME: " + message);
                // onSend("AI: " + error);
                onSend({ type: "recieved", text: error.response.data.message });
              },
            }
          );
          setMessage("");
        }
      } catch (error) {
        setIsLoading(false)
        console.error(error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && message != "") {
      handleSend(false);
    }
  };

  const handleAttachFileClick = () => {
    document.getElementById("file-input").click(); // Trigger the hidden file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      // Generate image preview if the file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result); // Set preview image
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null); // Clear preview if not an image
        setFileIcon(true);
        setFileDetails({ name: file.name, type: file.type })
      }
    }
  };

  const handleClosePreview = () => {
    setFileIcon(false);
    setFile(null); // Clear the file name
    setImagePreview(null); // Remove the image preview
    document.getElementById("file-input").value = ""; // Reset file input
  };

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  // Configure recognition settings
  // recognition.continuous = true; // Keep listening even with pauses
  recognition.interimResults = true;
  recognition.lang = "en-US";

  // Handle results
  recognition.onresult = (event) => {
    const currentTranscript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    setMessage(currentTranscript);
  };

  // Restart recognition if it stops unexpectedly
  //   recognition.onend = () => {
  //     console.log("Recognition ended");
  //     if (isListening) {
  //       recognition.start();
  //     }
  //   };

  recognition.onerror = (event) => {
    setIsListening(false);
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  const cancelRequest = () => {
    cancelPostDataRequest()
  }

  // application/pdf
  // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  // application/vnd.openxmlformats-officedocument.wordprocessingml.document
  // text/plain

  // switch (fileDetails.type) {
  //   case "application/pdf":
  //     <FaFileAlt size={50} color="black" />
  //     break;
  //   case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
  //     <TbFileSpreadsheet size={50} color="black" />
  //     break;
  //   case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
  //     <FaFileWord size={50} color="black" />
  //     break;
  //   default:
  //     <IoDocumentText size={50} color="black" />
  // }


  return (
    <Box className={"message-input relative"}>
      {/* Image preview */}
      {(imagePreview || fileIcon) && (
        <div className=" absolute bottom-full ">
          <div
            // style={{ marginTop: 10, textAlign: "center", position: "relative" }}
            className=" relative"
          >
            <IconButton
              size="small"
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                color: "white",
                width: 15,
                height: 15,
                backgroundColor: "rgba(0,0,0, 0.5)",
              }}
              onClick={handleClosePreview}
            >
              <CloseIcon
                style={{
                  width: 15,
                  height: 15,
                }}
                fontSize="small"
              />
            </IconButton>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: 50, borderRadius: 8 }}
              />
            ) : <div className="w-fit h-fit">
              {
                (() => {
                  switch (fileDetails.type) {
                    case "application/pdf":
                      return <BiSolidFilePdf size={50} color="#F40F02" />;
                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                      return <TbFileSpreadsheet size={50} color="#2e7d34" />;
                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                      return <FaFileWord size={50} color="#1566b9" />;
                    default:
                      return <IoDocumentText size={50} color="white" />;
                  }
                })()
              }
            </div>
            }
          </div>
        </div>
      )}
      <TextField
        // multiline
        // rows={1}
        error={error}
        autoComplete="off"
        variant="outlined"
        fullWidth
        // defaultValue={prompt}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Type your message here..."
        sx={{
          "& .MuiInputBase-input": {
            paddingLeft: "8px", // Add left padding here
          },
          "& .MuiInputBase-root": {
            backgroundColor: "#08151F", // Set to desired background color
            color: "white", // Set to desired text color
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {(aiType === AiType.IMAGETOTEXT ||
                aiType === AiType.FILES ||
                aiType === AiType.TRANSLATION ||
                aiType == AiType.SUMMARIZATION) && (
                  <IconButton
                    edge="start"
                    color="primary"
                    onClick={handleAttachFileClick}
                  >
                    <AttachFileIcon />
                  </IconButton>
                )}
            </InputAdornment>
          ),

          // startAdornment: (aiType == AiType.IMAGETOTEXT ||
          //   aiType == AiType.FILES) && (
          //   <InputAdornment position="start">
          //     <IconButton
          //       edge="start"
          //       color="primary"
          //       onClick={handleAttachFileClick}
          //     >
          //       <AttachFileIcon />
          //     </IconButton>
          //   </InputAdornment>
          // ),
          endAdornment: (
            <InputAdornment position="end">
              {!isListening ? (
                <IconButton
                  edge="start"
                  color="primary"
                  onClick={() => startListening()}
                >
                  <IoMdMic />
                </IconButton>
              ) : (
                <IconButton
                  edge="start"
                  color="primary"
                  onClick={() => stopListening()}
                >
                  <IoMdMicOff />
                </IconButton>
              )}
              {!isTyping || (aiType == AiType.IMAGES && !isResponseLoading) ? (<IconButton
                edge="end"
                color="primary"
                onClick={() => { message != "" && handleSend(false) }}
              >
                <SendIcon />
              </IconButton>)
                :
                (<IconButton
                  edge="end"
                  color="primary"
                  onClick={() => { cancelRequest(); handleStopTyping() }}
                >
                  <StopIcon />
                </IconButton>)
              }
            </InputAdornment>
          ),
        }}
      />
      {/* Hidden file input */}
      <input
        id="file-input"
        type="file"
        accept={
          aiType == AiType.FILES ? "application/pdf, .doc, .docx" : "image/*"
        }
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box >
    // <VoiceToText />
  );
};

export default ChatInput;
