import React from "react";


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
            const url = window.URL.createObjectURL(blob);

            // Create a temporary anchor element
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName; // Specify the file name
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the image:", error);
        }
    };

    return (
        <button
            onClick={handleDownload}
            style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        >
            Download Image
        </button>
    );
};

export default ImageDownload;
