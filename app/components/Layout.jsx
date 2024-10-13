// src/Layout.js
import React from "react";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Box component="main" sx={{ flex: 1 }} className="main-content-wrap">
        {children}
      </Box>
    </>
  );
};

export default Layout;
