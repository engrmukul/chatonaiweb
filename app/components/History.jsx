// src/Home.js
import React from 'react';
import {feature, mainContent} from "../AppStyle";
import {Box} from "@mui/material";
import ClaimOffer from "./ClaimOffer";
import HistoryListItem from "./HistoryListItem";

const History = () => {
    return (
        <Box sx={mainContent} className={"main-content"}>
            <HistoryListItem/>
            <Box className={'premium-feature-wrap'} sx={feature}>
                <ClaimOffer/>
            </Box>
        </Box>
    );
};

export default History;
