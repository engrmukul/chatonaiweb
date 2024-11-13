import React, { useState, useEffect } from "react";

const VoiceToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  //   useEffect(() => {
  //     if (!recognition) {
  //       setError("Speech Recognition API is not supported in this browser.");
  //       return;
  //     }

  // Configure recognition settings
  recognition.continuous = true; // Keep listening even with pauses
  recognition.interimResults = true;
  recognition.lang = "en-US";

  // Handle results
  recognition.onresult = (event) => {
    console.log("Recognition result event:", event);
    const currentTranscript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    //   setTranscript(
    //     (prevTranscript) => prevTranscript + " " + currentTranscript
    //   );
    setTranscript(currentTranscript);
  };

  // Restart recognition if it stops unexpectedly
  //   recognition.onend = () => {
  //     console.log("Recognition ended");
  //     if (isListening) {
  //       recognition.start();
  //     }
  //   };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setError("Speech recognition error: " + event.error);
    setIsListening(false);
  };

  //   return () => {
  //     recognition.stop();
  //   };
  //   }, [isListening, recognition]);

  const startListening = () => {
    if (recognition) {
      console.log("Starting recognition");
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    console.log("Stopping recognition");
    setIsListening(false);
    recognition.stop();
  };

  // return (
  //   <div className=" bg-gray-300">
  //     <h1>Voice to Text Converter</h1>
  //     {error && <p style={{ color: "red" }}>{error}</p>}
  //     <button onClick={isListening ? stopListening : startListening}>
  //       {isListening ? "Stop" : "Start"} Listening
  //     </button>
  //     <p>{transcript}</p>
  //   </div>
  // );
};

export default VoiceToText;
