// src/Home.js
import ReceiveQuickAns from "@/app/components/ReceiveQuickAns";
import TaskForAiItems from "@/app/components/TaskForAIItems";
import useFetchData from "@/app/library/hooks/useFetchData";
import { endpoints } from "@/app/library/share/endpoints";
import React from "react";
import { mainContent, TaskAIStyle } from "../AppStyle";
import { Box, CardActionArea } from "@mui/material";
import ClaimOffer from "./ClaimOffer";
import Chip from "@mui/material/Chip";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import InstagramIcon from "@mui/icons-material/Instagram";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SchoolIcon from "@mui/icons-material/School";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import WorkIcon from "@mui/icons-material/Work";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import TimelineIcon from "@mui/icons-material/Timeline";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import CodeIcon from "@mui/icons-material/Code";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const TasksForAi = () => {
  const [selectedTag, setSelectedTag] = React.useState(null);

  const { data, isLoading, error } = useFetchData(endpoints.getAllTags);

  const tags = data?.data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <Box sx={mainContent} className={"main-content"}>
      <ReceiveQuickAns />
      <Box className={"task-ai-wrap"} sx={TaskAIStyle}>
        <Box className={"tags"}>
          {tags?.map((tag) => (
            <Chip
              onClick={() => setSelectedTag(tag)}
              key={tag._id}
              icon={<img src={tag.icon} alt={tag.title} className="w-4 h-4" />}
              label={tag.title}
              size={"medium"}
              color={selectedTag === tag ? "primary" : "default"}
            />
          ))}
        </Box>

        <ClaimOffer />

        <TaskForAiItems selectedTag={selectedTag} />
      </Box>
    </Box>
  );
};

export default TasksForAi;
