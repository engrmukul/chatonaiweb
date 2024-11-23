import { getJwtToken } from "@/app/library/functions";
import useDeleteData from "@/app/library/hooks/useDeleteData";
import useFetchData from "@/app/library/hooks/useFetchData";
import usePostData from "@/app/library/hooks/usePostData";
import { endpoints } from "@/app/library/share/endpoints";
import { Box, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CiBookmark } from "react-icons/ci";
import { IoIosBookmark } from "react-icons/io";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function TaskForAiItems({ selectedTag }) {
  const [selectedTagId, setSelectedTagId] = useState(null);

  const userToken = getJwtToken();
  //   const { data, isLoading, error } = useFetchData(endpoints.getAllPrompts &tagId ={selectedTag?._id} );
  const { data, isLoading, error } = useFetchData(
    endpoints.getAllPrompts.concat(`&tagId=${selectedTag?._id}`),
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const { data: favoriteData, isLoading: isFavoriteLoading } = useFetchData(
    endpoints.getAllFavoritePrompt,
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const { mutate: deleteFavorite } = useDeleteData();

  const handleDelete = (id) => {
    deleteFavorite({
      url: `${endpoints.removeFavoritePromptById(id)}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  };

  const { mutate } = usePostData(endpoints.createFavoritePrompt);

  const addToFavorite = (id) => {
    mutate({
      data: { promptId: id },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  const isFavorite = (promptId) => {
    return favoriteData?.payload?.some(
      (fav) => fav?.promptId?._id === promptId
    );
  };

  const router = useRouter();
  const pathname = usePathname();

  // Set the basePath based on the current pathname
  const basePath = pathname.startsWith("/app/chats")
    ? "/app/chats"
    : pathname.startsWith("/app/task-for-ai")
      ? "/app/task-for-ai"
      : "/app/history";

  //   const handleNavigate = (id) => {
  //     router.push(`${basePath}/${id}`);
  //   };
  const handleNavigate = (id, promptData) => {
    // Passing the ID and any prompt data as a query string
    const query = new URLSearchParams({
      id: id,
      prompt: promptData.prompt,
    }).toString();
    router.push(`${basePath}/${id}?${query}`);
    setSelectedTagId(promptData.id);
  };

  return (
    <Box className={"task-items"}>
      {data?.data?.map((prompt) => {
        const isFavoritePrompt = isFavorite(prompt._id);
        return (
          <Card
            onClick={() =>
              handleNavigate(prompt?._id, {
                prompt: prompt?.prompt,
              })
            }
            className={"card-item"}
            key={prompt?._id}
          >
            <CardActionArea>
              <CardContent>
                <Box className={"card-icons"}>
                  <CardMedia
                    className={"mini-icon left-icon"}
                    component="img"
                    image={prompt?.icon ?? "/tasks_for_ai/note.png"}
                    alt={prompt?.title}
                  />
                  <Box
                    className={"mini-icon right"}
                    onClick={() =>
                      isFavoritePrompt
                        ? handleDelete(prompt._id)
                        : addToFavorite(prompt._id)
                    }
                  >
                    {isFavoritePrompt ? <IoIosBookmark /> : <CiBookmark />}
                  </Box>
                </Box>

                <Typography gutterBottom variant="h6" component="div">
                  {prompt?.title}
                </Typography>
                <Typography variant="body2" color="text.light">
                  {prompt?.prompt}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Box>
  );
}
