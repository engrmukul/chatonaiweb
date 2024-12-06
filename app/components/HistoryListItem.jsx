// src/Home.js
import React, { useEffect, useState } from "react";
import { chatItem } from "../AppStyle";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useRouter } from "next/navigation";
import useFetchData from "../library/hooks/useFetchData";
import { endpoints } from "../library/share/endpoints";
import usePostData from "../library/hooks/usePostData";
import { getJwtToken } from "../library/functions";

const options = ["Option 1", "Option 2", "Option 3"];

// const data = [
//     {
//         title: 'Option 1',
//         date: '15.05.2024 00:55'
//     },
//     {
//         title: 'Option 2',
//         date: '15.05.2024 00:55'
//     },
//     {
//         title: 'Option 3',
//         date: '15.05.2024 00:55'
//     },
//     {
//         title: 'Option 4',
//         date: '15.05.2024 00:55'
//     }
// ]

const HistoryListItem = () => {
  const route = useRouter();
  const [history, sethistory] = useState([]);

  const { data, isLoading, refetch } = useFetchData(endpoints.getAllHistory);
  const { mutate, isLoading: deleteLoading } = usePostData(
    endpoints.deleteHistory
  );
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
    handleClose();
  };
  const userToken = getJwtToken();

  const handleDelete = async (id, index) => {
    mutate({
      id,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    removeItem(index);
  };

  useEffect(() => {
    sethistory(data?.data);
  }, [data]);

  const removeItem = (index) => {
    const newArray = [...history]; // Make a copy of the array
    newArray.splice(index, 1), // Remove the item at the specified index
      sethistory(newArray); // Update the state with the new array
  };

  const handleNavigate = ({ id, aiType, historyId }) => {
    router.push(
      `/app/chats/${id}?id=${id}&type=${aiType}&historyId=${historyId}`
    );
  };

  return (
    <Box className={"chat-item-list"} sx={chatItem}>
      <h2 className={"title"}>History</h2>

      <Box className={"list-wrap"}>
        <List>
          {history?.map((item, index) => (
            <ListItem key={index}>
              <div
                className=" hover:cursor-pointer"
                onClick={() =>
                  handleNavigate({
                    id: item.promptId._id,
                    aiType: item.promptId.aiType,
                    historyId: item?._id,
                  })
                }
              >
                <Box className="info">
                  <ListItemText
                    className={"title"}
                    primary={item.promptId.title}
                  />
                  <ListItemText
                    className={"date-time"}
                    primary={new Date(item.createdAt).toDateString()}
                  />
                </Box>
              </div>
              <IconButton
                edge="end"
                aria-label="options"
                onClick={(event) => handleClick(event, index)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && selectedIndex === index}
                onClose={handleClose}
              >
                {/* <MenuItem>
                                    Rename <EditIcon />
                                </MenuItem> */}
                <MenuItem onClick={() => handleDelete(item._id, index)}>
                  Delete{" "}
                  <Box>
                    <DeleteIcon />
                  </Box>
                </MenuItem>
              </Menu>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default HistoryListItem;
