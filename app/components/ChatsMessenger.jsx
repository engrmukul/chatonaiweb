// src/Home.js
import ReceiveQuickAns from "@/app/components/ReceiveQuickAns";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { mainContent, messenger } from "../AppStyle";
import { useRouter, useSearchParams } from "next/navigation";
import ChatInput from "./ChatInput";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import BoltIcon from "@mui/icons-material/Bolt";
import { strict } from "assert";

const Messenger = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const prompt = searchParams.get("prompt");

  const router = useRouter();
  const [messages, setMessages] = useState([]);

  const handleSend = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const TypingEffect = ({ text, speed = 100 }) => {
    const [displayedText, setDisplayedText] = useState("");
    useEffect(() => {
      let index = 0;
      let currentText = ""; // Local variable to avoid skipping characters
      const timer = setInterval(() => {
        if (index < text.length) {
          currentText += text[index]; // Append next character to the local variable
          setDisplayedText(currentText); // Update state with the local variable
          index++;
        } else {
          clearInterval(timer); // Stop the interval when done
        }
      }, speed);

      return () => clearInterval(timer); // Cleanup on unmount
    }, [text, speed]);

    return <span>{displayedText}</span>;
  };

  const handleNavigate = () => {
    router.push("/messenger");
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
                onChange={handleChange}
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

            <Box className={"message-reply-history"}>
              {/* {messages.slice(0, -1).map((msg, index) => (
                <div key={index}>{msg.text}</div>
              ))} */}
              {messages.slice(0, -1).map((msg, index) => {
                const url = msg.text.match(/https:\/\/[^"]+/);
                return (
                  <div
                    className={`flex  ${msg.type == "sent" ? "justify-end" : "justify-start"
                      }`}
                    key={index}
                  >
                    {url ? (
                      <div>
                        <a href={`${url ? url[0] : ""}`} target="_blank">
                          <img
                            src={url ? `${url[0]}` : ""}
                            alt=""
                            className="h-[400px] w-[500px]"
                          />
                        </a>
                      </div>
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
                  <div className={`flex justify-end`}>
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
                      {/* <TypingEffect
                        text={messages[messages.length - 1].text}
                        speed={30}
                      /> */}
                    </Typography>
                  </div>
                )}

              {messages.length > 0 &&
                messages[messages.length - 1].type == "recieved" &&
                typeof messages[messages.length - 1].text == "string" &&
                !messages[messages.length - 1].text?.match(
                  /https:\/\/[^"]+/
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
                    className=" max-w-fit w-1/2"
                  >
                    {/* {TextWithLineBreaks(msg.text)} */}
                    <TypingEffect
                      text={messages[messages.length - 1].text}
                      speed={30}
                    />
                  </Typography>
                )}

              {messages.length > 0 &&
                messages[messages.length - 1].type == "recieved" &&
                typeof messages[messages.length - 1].text == "string" &&
                messages[messages.length - 1].text.match(/https:\/\/[^"]+/) && (
                  <div>
                    <a
                      href={messages[messages.length - 1].text}
                      target="_blank"
                    >
                      <img
                        src={messages[messages.length - 1].text}
                        alt=""
                        className="h-[400px] w-[500px]"
                      />
                    </a>
                  </div>
                )}
            </Box>
            <ChatInput onSend={handleSend} searchParams={searchParams} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Messenger;
