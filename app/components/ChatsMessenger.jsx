// src/Home.js
import ReceiveQuickAns from "@/app/components/ReceiveQuickAns";
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { mainContent, messenger } from "../AppStyle";
import { useRouter, useSearchParams } from "next/navigation";
import ChatInput from "./ChatInput";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import BoltIcon from "@mui/icons-material/Bolt";
import { strict } from "assert";
import AIType from "./enums/AiTypeEnum";
import AnimatedLoader from "./Loader/Loader";
import ImageDownload from "./downloadImage/Download";

import TypingEffect from "./TypingEffect";
import Image from "next/image";
import { BiSolidFilePdf } from "react-icons/bi";
import { TbFileSpreadsheet } from "react-icons/tb";
import { FaFileWord } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import useFetchData from "../library/hooks/useFetchData";
import { endpoints } from "../library/share/endpoints";

const Messenger = () => {
  const searchParams = useSearchParams();
  const historyId = searchParams.get("historyId");

  const router = useRouter();
  // const [messages, setMessages] = useState([{ type: "sent", fileUrl: previouslyUploadedFileUrl, text: request }, { type: "recieved", text: response }]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [stopTyping, setStopTyping] = useState(false); // State to control stopping

  const {
    data: historyData,
    isLoading: historyLoading,
    refetch,
  } = useFetchData(endpoints.getHistoryById.concat(`/${historyId}`));

  useEffect(() => {
    if (!historyLoading && historyData) {
      const { fileId, request, response } = historyData?.data[0];
      const fileInfo = { name: fileId?.originalname, type: fileId?.mimetype };
      const fileInfoString =
        fileInfo.name && fileInfo.type ? JSON.stringify(fileInfo) : null;
      setMessages((pre) => [
        ...pre,
        { type: "sent", text: fileInfoString },
        { type: "sent", text: request },
        { type: "recieved", text: response },
      ]);
    }
    // return () => { setMessages([]) }
  }, [historyLoading]);

  const handleSend = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleStopTyping = () => {
    setStopTyping(true); // Trigger to stop typing
    setIsTyping(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  function TextWithLineBreaks(props) {
    const textWithBreaks = props?.split("\n").map((text, index) => (
      <React.Fragment key={index}>
        {text}
        <br />
      </React.Fragment>
    ));

    return <div>{textWithBreaks}</div>;
  }
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Function to scroll to the bottom
    const scrollToBottom = () => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Observe changes in the container
    const observer = new MutationObserver(() => {
      // Scroll after DOM updates are complete
      requestAnimationFrame(scrollToBottom);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true, // Detect additions/removals of child elements
        subtree: true, // Observe changes within nested nodes
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Box
        sx={{ ...mainContent, backgroundColor: "#000" }}
        className={"main-content"}
      >
        <ReceiveQuickAns />
        <Box className={"messenger"} sx={messenger}>
          <Box sx={{ padding: 2 }}>
            <Box className={"turbo-gpt-tab"}>
              <Tabs
                value={value}
                // onChange={handleChange}
                aria-label="icon position tabs example"
              >
                <Tab
                  icon={<AutoFixHighIcon />}
                  iconPosition="start"
                  label="GPT-Turbo"
                />
                <Tab icon={<BoltIcon />} iconPosition="start" label="GPT-4" />
              </Tabs>
            </Box>

            <Box ref={containerRef} className={"message-reply-history"}>
              {messages.slice(0, -1).map((msg, index) => {
                if (typeof msg.text !== "string") return;
                const url =
                  msg.text &&
                  typeof msg.text == "string" &&
                  msg.text.match(/^https?:\/\/[^"]+/);
                const youtubeUrl =
                  url && url[0].includes("https://www.youtube.com");
                let fileDetails = {};
                try {
                  fileDetails = JSON.parse(msg.text);
                } catch {}
                return (
                  <div
                    className={`flex  ${
                      msg.type == "sent" ? "justify-end" : "justify-start"
                    } mb-2`}
                    key={index}
                  >
                    {/* {aiType == AIType.IMAGES && <div className=" h-[400px] w-[500px] shadow-md animate-pulse"></div>} */}
                    {url && !youtubeUrl ? (
                      <div className=" relative h-fit w-fit">
                        {/* <a href={`${url ? url[0] : ""}`} target="_blank" className=" h-fit w-fit"> */}
                        <img
                          src={url ? `${url[0]}` : ""}
                          alt=""
                          className="h-[400px] w-[500px]"
                        />
                        {/* </a> */}
                        <ImageDownload imageUrl={url[0]} />
                      </div>
                    ) : Object.keys(fileDetails).length > 0 ? (
                      <>
                        {(() => {
                          switch (fileDetails.type) {
                            case "application/pdf":
                              return (
                                <div className=" flex gap-2 px-2 py-1 rounded-[12px] border border-slate-600">
                                  <BiSolidFilePdf size={50} color="#F40F02" />
                                  <div className="flex flex-col">
                                    <p className=" text-base">
                                      {fileDetails.name}
                                    </p>
                                    <p className=" text-xs font-light">PDF</p>
                                  </div>
                                </div>
                              );
                            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                              return (
                                <div className=" flex gap-2 px-2 py-1 rounded-[12px] border border-slate-600">
                                  <TbFileSpreadsheet
                                    size={50}
                                    color="#2e7d34"
                                  />
                                  <div className="flex flex-col">
                                    <p className=" text-base">
                                      {fileDetails.name}
                                    </p>
                                    <p className=" text-xs font-light">
                                      Spreadsheet
                                    </p>
                                  </div>
                                </div>
                              );
                            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                              return (
                                <div className=" flex gap-2 px-2 py-1 rounded-[12px] border border-slate-600">
                                  <FaFileWord size={50} color="#1566b9" />
                                  <div className="flex flex-col">
                                    <p className=" text-base">
                                      {fileDetails.name}
                                    </p>
                                    <p className=" text-xs font-light">Word</p>
                                  </div>
                                </div>
                              );
                            default:
                              return (
                                <div className=" flex gap-2 px-2 py-1 rounded-[12px] border border-slate-600">
                                  <IoDocumentText size={50} color="white" />
                                  <div className="flex flex-col">
                                    <p className=" text-base">
                                      {fileDetails.name}
                                    </p>
                                    <p className=" text-xs font-light">TEXT</p>
                                  </div>
                                </div>
                              );
                          }
                        })()}
                      </>
                    ) : (
                      <Typography
                        // key={index}
                        variant="body1"
                        sx={{
                          marginBottom: 1.5,
                          py: 1,
                          px: 2,
                          bgcolor: "#505050",
                          borderRadius: "12px",
                        }}
                        className=" max-w-fit w-1/2"
                      >
                        {TextWithLineBreaks(msg.text)}
                      </Typography>
                    )}
                  </div>
                );
              })}
              {messages.length > 0 &&
                messages[messages.length - 1].type == "sent" && (
                  <div className={`flex justify-end  mb-2`}>
                    <Typography
                      // key={index}
                      // variant="body1"
                      sx={{
                        marginBottom: 1.5,
                        py: 1,
                        px: 2,
                        bgcolor: "#505050",
                        borderRadius: "12px",
                      }}
                      className=" max-w-fit w-1/2"
                    >
                      {TextWithLineBreaks(messages[messages.length - 1].text)}
                    </Typography>
                  </div>
                )}

              {messages.length > 0 &&
                messages[messages.length - 1].type == "recieved" &&
                typeof messages[messages.length - 1].text == "string" &&
                !messages[messages.length - 1].text?.match(
                  /^https?:\/\/[^"]+/
                ) && (
                  <Typography
                    // key={index}
                    variant="body1"
                    sx={{
                      marginBottom: 1.5,
                      py: 1,
                      px: 2,
                      bgcolor: "#505050",
                      borderRadius: "12px",
                    }}
                    className=" max-w-fit w-1/2 mb-2"
                  >
                    {/* {TextWithLineBreaks(msg.text)} */}
                    <TypingEffect
                      text={messages[messages.length - 1].text}
                      speed={8}
                      setIsTyping={setIsTyping}
                      stopTyping={stopTyping}
                    />
                  </Typography>
                )}

              {messages.length > 0 &&
                messages[messages.length - 1].type == "recieved" &&
                typeof messages[messages.length - 1].text == "string" &&
                messages[messages.length - 1].text.match(
                  /^https?:\/\/[^"]+/
                ) && (
                  <div className=" relative mb-2 h-[400px] w-[500px] bg-black/30 max-w-fit">
                    <Image
                      src={messages[messages.length - 1].text}
                      alt=""
                      className="h-[400px] w-[500px]"
                      height={400}
                      width={500}
                      unoptimized
                    />
                    <ImageDownload
                      imageUrl={messages[messages.length - 1].text}
                    />
                  </div>
                )}
              <div ref={bottomRef} />
              {isLoading && (
                <div className=" flex justify-start ">
                  <AnimatedLoader size={8} color="white" />
                </div>
              )}
            </Box>
            <ChatInput
              onSend={handleSend}
              searchParams={searchParams}
              setIsLoading={setIsLoading}
              isResponseLoading={isLoading}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
              handleStopTyping={handleStopTyping}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Messenger;
