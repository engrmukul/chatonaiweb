import React, { useState } from "react";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShareIcon from '@mui/icons-material/Share';

const ImageDownload = ({ imageUrl, fileName }) => {
    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch the image.");
            }

            const blob = await response.blob();
            const contentType = response.headers.get("Content-Type");
            let fileExtension = ".jpg"; // Default extension

            // Check the content type and set the correct file extension
            if (contentType) {
                if (contentType.includes("jpeg")) {
                    fileExtension = ".jpg";
                } else if (contentType.includes("png")) {
                    fileExtension = ".png";
                } else if (contentType.includes("gif")) {
                    fileExtension = ".gif";
                }
            }

            const url = window.URL.createObjectURL(blob);

            // Create a temporary anchor element
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName ? `${fileName}${fileExtension}` : `image${fileExtension}`; // Use file extension
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the image:", error);
        }
    };

    const handleShare = async () => {
        try {
            // Check if the Web Share API is supported
            if (!navigator.share) {
                alert("Sharing not supported in this browser.");
                return;
            }

            const response = await fetch(imageUrl, {
                method: "GET",
            });
            const blob = await response.blob();
            const file = new File([blob], fileName, { type: blob.type });

            await navigator.share({
                title: "Check out this image!",
                files: [file],
            });

            console.log("Image shared successfully!");
        } catch (error) {
            console.error("Error sharing the image:", error);
        }
    };

    const [tooltipVisible, setTooltipVisible] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(imageUrl);
            setTooltipVisible(true);

            // Hide the tooltip after 2 seconds
            setTimeout(() => {
                setTooltipVisible(false);
            }, 1000);
        } catch (error) {
            console.error("Error copying to clipboard:", error);
        }
    };

    return (
        <div className=" absolute bottom-0 left-0 flex gap-2 justify-between p-2 bg-black/30 hover:bg-black/70">
            <button
                onClick={handleDownload}
            >
                <FileDownloadIcon className="text-gray-300 hover:text-white" />
            </button>
            <div className="relative">
                <button
                    // onClick={handleShare}
                    onClick={handleCopy}
                >
                    <ShareIcon className="text-gray-300 hover:text-white" />
                </button>


                {/* {tooltipVisible && ( */}
                <div
                    className={`absolute whitespace-nowrap top-[-40px] left-0 transform  bg-black text-white text-xs py-1 px-2 rounded shadow-lg transition-opacity duration-300 ${tooltipVisible ? "opacity-100" : "opacity-0"
                        }`}
                >
                    URL copied!
                </div>
                {/* )} */}
            </div>
        </div>
    );
};

export default ImageDownload;
