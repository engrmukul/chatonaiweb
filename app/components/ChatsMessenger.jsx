// src/Home.js
import ReceiveQuickAns from "@/app/components/ReceiveQuickAns";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { mainContent, messenger } from "../AppStyle";
import { useRouter, useSearchParams } from "next/navigation";
import ChatInput from "./ChatInput";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import BoltIcon from "@mui/icons-material/Bolt";

const Messenger = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const prompt = searchParams.get("prompt");

  // console.log("id", id, prompt);

  const router = useRouter();
  const [messages, setMessages] = useState([]);

  const handleSend = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleNavigate = () => {
    console.log("clicked");
    router.push("/messenger");
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  function TextWithLineBreaks(props) {
    console.log(" props......2222222", props);
    // const urlMatch = props.match(/https:\/\/[^"]+/);
    // console.log("urlMatch......33333", props.match(/https:\/\/[^"]+/));
    const textWithBreaks = props?.split("\n").map((text, index) => (
      <React.Fragment key={index}>
        {text}
        <br />
      </React.Fragment>
    ));

    return <div>{textWithBreaks}</div>;
  }

  // console.log("messages", messages);

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
              {messages.map((msg, index) => {
                const url = msg.match(/https:\/\/[^"]+/);
                return index % 2 === 0 ? (
                  <div className="flex justify-end" key={index}>
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
                    >
                      {TextWithLineBreaks(msg)}
                    </Typography>
                  </div>
                ) : !url ? (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{ marginBottom: 1.5 }}
                  >
                    {TextWithLineBreaks(msg)}
                  </Typography>
                ) : (
                  <div key={index}>
                    <a href={`${url ? url[0] : ""}`} target="_blank">
                      <img
                        src={url ? `${url[0]}` : ""}
                        alt=""
                        className="h-[400px] w-[500px]"
                      />
                    </a>
                  </div>
                );
              })}
            </Box>
            <ChatInput onSend={handleSend} searchParams={searchParams} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Messenger;
