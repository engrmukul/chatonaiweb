import React from "react";
import "./ThreeDotLoader.css";


const ThreeDotLoader = ({
    size = 10,
    color = "#3498db",
}) => {
    const style = {
        width: size,
        height: size,
        backgroundColor: color,
    };

    return (
        <div className="three-dot-loader bg-[#505050] p-1.5 px-2 rounded-md">
            <div style={style}></div>
            <div style={style}></div>
            <div style={style}></div>
        </div>
    );
};

export default ThreeDotLoader;
