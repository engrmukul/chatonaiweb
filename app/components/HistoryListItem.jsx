// src/Home.js
import React, {useState} from 'react';
import {chatItem} from "../AppStyle";
import {Box, IconButton, List, ListItem, ListItemText, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {useRouter} from 'next/navigation';


const options = [
    'Option 1',
    'Option 2',
    'Option 3',
];

const data = [
    {
        title: 'Option 1',
        date: '15.05.2024 00:55'
    },
    {
        title: 'Option 2',
        date: '15.05.2024 00:55'
    },
    {
        title: 'Option 3',
        date: '15.05.2024 00:55'
    },
    {
        title: 'Option 4',
        date: '15.05.2024 00:55'
    }
]


const HistoryListItem = () => {

    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setSelectedIndex(index);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedIndex(null);
    };

    const handleMenuItemClick = (option) => {
        console.log('Selected option:', option);
        handleClose();
    };




    const handleNavigate = () => {
        console.log('clicked')
        router.push('messenger');
    }

    return (
        <Box className={'chat-item-list'} sx={chatItem}>

            <h2 className={'title'}>History</h2>

            <Box className={"list-wrap"}>
                <List>
                    {
                        data?.map((item, index) => <ListItem key={index}>
                            <Box className={'info'}>
                                <ListItemText className={'title'} primary={item.title}/>
                                <ListItemText className={'date-time'} primary={item.date}/>
                            </Box>
                            <IconButton
                                edge="end"
                                aria-label="options"
                                onClick={(event) => handleClick(event, index)}
                            >
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl) && selectedIndex === index}
                                onClose={handleClose}
                            >
                                <MenuItem>
                                    Rename <EditIcon/>
                                </MenuItem>
                                <MenuItem>
                                    Delete <Box><DeleteIcon/></Box>
                                </MenuItem>
                            </Menu>
                        </ListItem>)
                    }
                </List>
            </Box>


        </Box>
    );
};

export default HistoryListItem;
