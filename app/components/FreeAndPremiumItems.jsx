// // FreeAndPremiumItems.js
// import useFetchData from "@/app/library/hooks/useFetchData";
// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { endpoints } from "../library/share/endpoints";

// export default function FreeAndPremiumItems() {
//   const [packages, setPackages] = useState({
//     free: [],
//     paid: [],
//   });

//   const { data, isLoading, error } = useFetchData(endpoints.getAllPrompts);

//   useEffect(() => {
//     if (data?.data) {
//       const freePackages = [];
//       const paidPackages = [];

//       data?.data.forEach((item) => {
//         if (item.packageType === "FREE") {
//           freePackages.push(item);
//         } else if (item.packageType === "PAID") {
//           paidPackages.push(item);
//         }
//       });

//       setPackages({ free: freePackages, paid: paidPackages });
//     }
//   }, [data]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading data: {error.message}</div>;

//   return (
//     <>
//       <Box className={"component-item"}>
//         <Box component={"h2"} className={"title text-2xl pt-5 pb-3"}>
//           Premium Features
//         </Box>
//         <Box className={"grid grid-cols-4 gap-4"}>
//           {packages?.paid?.map((pack) => (
//             <Card
//               className={"card-item min-h-72 bg-black text-white rounded "}
//               key={pack?.id}
//             >
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={pack?.backgroundImage ?? "/image-lab.jpg"}
//                   alt="Green Iguana"
//                   className="h-50"
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {pack?.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {pack?.subTitle}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           ))}
//         </Box>
//       </Box>
//       <Box className={"component-item with-double"}>
//         <Box component={"h2"} className={"title text-2xl pt-5 pb-3"}>
//           Get help with any task
//         </Box>
//         <Box className={"grid grid-cols-4 gap-4"}>
//           {packages?.free?.map((pack) => (
//             <Card
//               className={"card-item bg-black text-white rounded"}
//               key={pack?.id}
//             >
//               <CardActionArea>
//                 <CardContent>
//                   <Typography gutterBottom variant="h6" component="div">
//                     {pack?.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {pack?.subTitle}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//               <CardMedia
//                 className={"card-img p-2 w-25"}
//                 component="img"
//                 image={pack?.icon ?? "/images/ic_art.png"}
//                 alt="Green Iguana"
//               />
//             </Card>
//           ))}
//         </Box>
//       </Box>
//     </>
//   );
// }

// FreeAndPremiumItems.js
import useFetchData from "@/app/library/hooks/useFetchData";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { endpoints } from "../library/share/endpoints";
import { usePathname, useRouter } from "next/navigation";

export default function FreeAndPremiumItems() {
  const [packages, setPackages] = useState({
    free: [],
    paid: [],
  });
  const [selectedTag, setSelectedTag] = useState(null);

  const { data, isLoading, error } = useFetchData(endpoints.getAllPrompts);

  useEffect(() => {
    if (data?.data) {
      const freePackages = [];
      const paidPackages = [];

      data?.data.forEach((item) => {
        if (item.packageType === "FREE") {
          freePackages.push(item);
        } else if (item.packageType === "PAID") {
          paidPackages.push(item);
        }
      });

      setPackages({ free: freePackages, paid: paidPackages });
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

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
    setSelectedTag(promptData.id);
  };

  return (
    <>
      <Box className={"component-item"}>
        <Box component={"h2"} className={"title text-2xl pt-5 pb-3"}>
          Premium Features
        </Box>
        <Box className={"grid grid-cols-4 gap-4"}>
          {packages?.paid?.map((pack) => (
            <Card
              //   onClick={() =>
              //     handleNavigate(prompt?._id, {
              //       prompt: prompt?.prompt,
              //       category: group?.categoryTitle,
              //     })
              //   }
              onClick={() =>
                handleNavigate(pack?._id, {
                  prompt: pack?.prompt,
                })
              }
              className={"card-item min-h-72 bg-black text-white rounded "}
              key={pack?.id}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={pack?.backgroundImage ?? "/image-lab.jpg"}
                  alt="Green Iguana"
                  className="h-50"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {pack?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pack?.subTitle}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
      <Box className={"component-item with-double"}>
        <Box component={"h2"} className={"title text-2xl pt-5 pb-3"}>
          Get help with any task
        </Box>
        <Box className={"grid grid-cols-4 gap-4"}>
          {packages?.free?.map((pack) => (
            <Card
              className={"card-item bg-black text-white rounded"}
              key={pack?.id}
              onClick={() =>
                handleNavigate(pack?.id, {
                  prompt: pack?.prompt,
                })
              }
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {pack?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pack?.subTitle}
                  </Typography>
                </CardContent>
                <CardMedia
                  className={"card-img p-2 w-25"}
                  component="img"
                  image={pack?.icon ?? "/images/ic_art.png"}
                  alt="Green Iguana"
                />
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
