// ReceiveQuickAns.js
import useFetchData from "@/app/library/hooks/useFetchData";
import { endpoints } from "@/app/library/share/endpoints";
import { Box, SnackbarContent, Stack } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { chatItem } from "../AppStyle";

export default function ReceiveQuickAns({ parentKey }) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedTag, setSelectedTag] = React.useState(null);

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
      type: promptData.aiType,
    }).toString();
    router.push(`${basePath}/${id}?${query}`);
    setSelectedTag(promptData.id);
  };

  const { data, isLoading, error } = useFetchData(
    endpoints.promptsWithCategory
  );
  const promptGroupList = data?.payload;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <Box className="chat-item-list" sx={chatItem}>
      <h2 className="title">Receive quick answers</h2>
      {promptGroupList?.map((group) => (
        <Box className="group-items" key={group?.categoryId}>
          <Box className="py-1">{group?.categoryTitle}</Box>
          <Box>
            {group?.prompts?.map((prompt) => (
              <Stack
                spacing={2}
                sx={{ maxWidth: 600, mb: 1 }}
                key={prompt?._id}
              >
                <SnackbarContent
                  message={prompt?.title}
                  // action={
                  //   <Box
                  //     component="img"
                  //     src={group?.icon ?? "/images/smily_doller.png"}
                  //     alt="Custom Icon"
                  //     sx={{ width: 24, height: 24 }}
                  //   />
                  // }
                  //   onClick={() => handleNavigate(prompt?._id)}
                  onClick={() =>
                    handleNavigate(
                      prompt?._id,
                      prompt
                      // category: group?.categoryTitle,
                    )
                  }
                />
              </Stack>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
