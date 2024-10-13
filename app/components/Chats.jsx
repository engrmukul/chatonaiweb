// src/Home.js
import FreeAndPremiumItems from "@/app/components/FreeAndPremiumItems";
import ReceiveQuickAns from "@/app/components/ReceiveQuickAns";
import {Box} from "@mui/material";
import React from 'react';
import {feature, mainContent} from "../AppStyle";
import '../globals.css';
import ClaimOffer from "./ClaimOffer";

const Chats = () => {

    return (
        <>
            <Box sx={mainContent} className={"main-content"}>
                <ReceiveQuickAns />
                <Box className={'premium-feature-wrap overflow-auto'} sx={feature}>
                    <ClaimOffer/>
                    <FreeAndPremiumItems />
                </Box>
            </Box>

        </>
    );
};

export default Chats;
