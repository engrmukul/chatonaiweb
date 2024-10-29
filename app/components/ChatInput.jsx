// src/ChatInput.js
import React, { useState } from "react";
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
import usePostData from "../library/hooks/usePostData";
import { endpoints } from "../library/share/endpoints";
import { getJwtToken } from "../library/functions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import AiType from "./enums/AiTypeEnum";

const ChatInput = ({ onSend, searchParams }) => {
  const customPrompt = searchParams.get("prompt");
  const promptId = searchParams.get("id");
  const aiType = searchParams.get("type");
  const [message, setMessage] = useState(customPrompt || "");

  const { mutate } = usePostData(endpoints.createAI);
  const { mutate: fileupload } = usePostData(endpoints.fileUpload);
  const userToken = getJwtToken();

  //! const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    if (aiType == AiType.IMAGETOTEXT) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        onSend("ME: " + message);
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
              setImagePreview(null);
              mutate(
                {
                  data: {
                    customPrompt: message,
                    promptId: promptId,
                    stream: false,
                    voice: "alloy",
                    customFileUrl: response.data.url,
                  },
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                  },
                },
                {
                  onSuccess: (response) => {
                    if (response.message.text) {
                      onSend("AI: " + response.message.text);
                    } else if (response.message.summeriz) {
                      onSend("AI: " + response.message.summeriz);
                    } else if (response.message.translate) {
                      onSend("AI: " + response.message.translate);
                    } else if (response.message.imageUrl) {
                      onSend("AI: " + response.message.imageUrl);
                    }
                  },
                  onError: (error) => {
                    // onSend("ME: " + customPrompt);
                    // onSend("ME: " + message);
                    onSend("AI: " + error);
                  },
                }
              );
              setMessage("");
              // }
            },
            onError: (error) => {
              console.log("file___ERROR", error);
            },
          }
        );
      } catch (error) {
        console.error("Error uploading file", error);
      }
    } else {
      try {
        if (message.trim()) {
          onSend("ME: " + message);
          mutate(
            {
              data: {
                customPrompt: message,
                promptId: promptId,
                // size: "512",
                // size: "1024x1792", //For image
                // stream: true,
                stream: false,
                voice: "alloy",
                customFileUrl: "",
              },
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            },
            {
              onSuccess: (response) => {
                if (response.message.text) {
                  onSend("AI: " + response.message.text);
                } else if (response.message.summeriz) {
                  onSend("AI: " + response.message.summeriz);
                } else if (response.message.translate) {
                  onSend("AI: " + response.message.translate);
                } else if (response.message.imageUrl) {
                  onSend("AI: " + response.message.imageUrl);
                }
              },
              onError: (error) => {
                // onSend("ME: " + customPrompt);
                // onSend("ME: " + message);
                onSend("AI: " + error);
              },
            }
          );
          setMessage("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleAttachFileClick = () => {
    document.getElementById("file-input").click(); // Trigger the hidden file input
  };

  const handleFileChange = (event) => {
    console.log("event.target", event.target);
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
      }
    }
  };

  console.log("file", file);

  const handleClosePreview = () => {
    setFile(null); // Clear the file name
    setImagePreview(null); // Remove the image preview
    document.getElementById("file-input").value = ""; // Reset file input
  };

  return (
    <Box className={"message-input relative"}>
      {/* Image preview */}
      {imagePreview && (
        <div className=" absolute bottom-full">
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
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: 50, borderRadius: 8 }}
            />
          </div>
        </div>
      )}
      <TextField
        // multiline
        // rows={1}
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
              <IconButton
                edge="start"
                color="primary"
                onClick={handleAttachFileClick}
              >
                <AttachFileIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" color="primary" onClick={handleSend}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {/* Hidden file input */}
      <input
        id="file-input"
        type="file"
        accept="image/*,application/pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default ChatInput;
