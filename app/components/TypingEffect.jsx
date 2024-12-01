import { useEffect, useRef, useState } from "react";

const TypingEffect = ({ text, speed = 100, setIsTyping, stopTyping }) => {
    const [displayedText, setDisplayedText] = useState('');
    const typingRef = useRef(null); // Store the typing interval ID

    useEffect(() => {
        let index = 0;
        let currentText = ''; // Local variable to avoid skipping characters

        const timer = setInterval(() => {
            if (stopTyping) {
                clearInterval(timer); // Stop the typing effect if stopTyping is true
                setIsTyping(false); // Set isTyping to false
                return; // Exit the interval early
            }
            if (index < text.length) {
                currentText += text[index]; // Append next character to the local variable
                setDisplayedText(currentText); // Update state with the local variable
                index++;
            } else {
                clearInterval(timer); // Stop the interval when done
                setIsTyping(false)
            }
        }, speed);

        typingRef.current = timer;

        return () => {
            clearInterval(timer)
        }; // Cleanup on unmount
    }, [text, speed, setIsTyping, stopTyping]);

    return <span style={{ whiteSpace: "pre-wrap" }}>{displayedText}</span>;
};

export default TypingEffect;