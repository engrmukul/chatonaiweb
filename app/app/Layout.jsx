// src/Layout.js
import {appWrapStyle} from "@/app/AppStyle";
import AuthLayout from "@/app/components/shared/AuthLayout";
import Sidebar from "@/app/components/Sidebar";
import {Box} from "@mui/material";
import React from 'react';

const Layout = ({children}) => {
    return (
        <AuthLayout authRequire={true}>
           <Box className='App inside-app' sx={appWrapStyle}>
               <Sidebar/>
               <Box component="main" sx={{flex: 1}} className='main-content-wrap'>
                   {children}
               </Box>
           </Box>
        </AuthLayout>
    );
};

export default Layout;
