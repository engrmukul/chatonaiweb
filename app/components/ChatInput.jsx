// src/ChatInput.js
import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import usePostData from "../library/hooks/usePostData";
import { endpoints } from "../library/share/endpoints";
import { getJwtToken } from "../library/functions";

const ChatInput = ({ onSend, searchParams }) => {
  const customPrompt = searchParams.get("prompt");
  const promptId = searchParams.get("id");
  const [message, setMessage] = useState(customPrompt || "");

  const { mutate } = usePostData(endpoints.createAI);
  const userToken = getJwtToken();

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      mutate(
        {
          data: {
            customPrompt: message,
            promptId: promptId,
            size: "512",
            stream: true,
            voice: "alloy",
            customFileUrl: "",
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
        {
          onSuccess: (response) => {
            // onSend("ME: " + customPrompt);
            onSend("ME: " + message);
            onSend("AI: " + response.message.text);
          },
          onError: (error) => {
            // onSend("ME: " + customPrompt);
            onSend("ME: " + message);
            onSend("AI: " + error);
          },
        }
      );
      setMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Box className={"message-input"}>
      <TextField
        variant="outlined"
        fullWidth
        // defaultValue={prompt}
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here..."
      />
      <IconButton color="primary" onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
