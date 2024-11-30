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
import AnimatedLoader from "./Loader/Loader"
import ImageDownload from "./downloadImage/Download"

const Messenger = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const prompt = searchParams.get("prompt");
  const aiType = searchParams.get("type");

  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

    return <span style={{ whiteSpace: "pre-wrap" }}>{displayedText}</span>;
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
        subtree: true,  // Observe changes within nested nodes
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
                const url = msg.text && msg.text.match(/https?:\/\/[^"]+/);
                return (
                  <div
                    className={`flex  ${msg.type == "sent" ? "justify-end" : "justify-start"
                      } mb-2`}
                    key={index}
                  >
                    {/* {aiType == AIType.IMAGES && <div className=" h-[400px] w-[500px] shadow-md animate-pulse"></div>} */}
                    {url ? (
                      <div className=" h-fit w-fit">

                        <a href={`${url ? url[0] : ""}`} target="_blank" className=" h-fit w-fit">
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
                  /https?:\/\/[^"]+/
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
                    />
                  </Typography>
                )}

              {messages.length > 0 &&
                messages[messages.length - 1].type == "recieved" &&
                typeof messages[messages.length - 1].text == "string" &&
                messages[messages.length - 1].text.match(/https?:\/\/[^"]+/) && (
                  <div className=" relative mb-2 w-fit max-w-fit">
                    {/* <a
                      href={messages[messages.length - 1].text}
                      target="_blank"
                    > */}
                    <img
                      src={messages[messages.length - 1].text}
                      alt=""
                      className="h-[400px] w-[500px]"
                    />
                    {/* </a> */}
                    {/* <a className=" absolute bottom-0 right-0" href={messages[messages.length - 1].text} download={"image"} style={{ marginTop: "20px", display: "inline-block", textDecoration: "none", backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", borderRadius: "5px" }}>
                      Download Image
                    </a> */}
                    <ImageDownload ImageUrl={messages[messages.length - 1].text} fileName="image.jpg" />
                  </div>
                )}
              <div ref={bottomRef} />
              {console.log(" isLoading", isLoading)}
              {isLoading && <div className=" flex justify-start ">
                <AnimatedLoader size={8} color="white" />
              </div>}
            </Box>
            <ChatInput onSend={handleSend} searchParams={searchParams} setIsLoading={setIsLoading} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Messenger;



