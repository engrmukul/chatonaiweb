export const appWrapStyle = {
  backgroundColor: "#0C2132",
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "100vh",
  display: "flex",

  "& .sidebar-nav": {
    position: "relative",
    width: "120px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    overflow: "hidden",
    background: "#1E1F22",
    height: "100%",
    "& ul": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",

      "& > div": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        cursor: "pointer",
        "& div": {
          minWidth: "auto",
        },
        "& svg path": {
          fill: "#fff",
        },
        "&.active": {
          backgroundColor: "#000",
        },
      },
    },
  },

  "& .main-content": {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
    flexGrow: 1,
  },
};

export const mainContent = {
  display: "flex",
  alignItems: "stretch",
  justifyContent: "flex-start",
  minWidth: 0,
  height: "100%",
  flex: "1 1 auto",
  flexDirection: "row!important",

  "& .claim-offer": {
    cursor: "pointer",
  },
};

export const chatItem = {
  backgroundColor: "#09151E",
  color: "#fff",
  minWidth: "340px",
  maxWidth: "340px",
  height: "100vh",
  overflowY: "auto",
  overflowX: "hidden",
  pt: 3,
  px: 2,
  "& .MuiSnackbarContent-root": {
    backgroundColor: "#000",
  },
  "& .title": {
    mt: 0,
    mb: 1,
  },

  "& .group-items": {
    mb: 2,
    "& .MuiStack-root ": {
      cursor: "pointer",
    },
  },

  "& .list-wrap": {
    minWidth: "300px",
    "& ul li": {
      background: "#35373C",
      display: "flex",
      justifyContent: "space-between",
      mb: 1,
      borderRadius: "5px",

      "& .title": {
        mb: 0,
      },
      "& .date-time": {
        fontSize: "12px",
      },
      "& svg path": {
        fill: "#fff",
      },
    },
  },
};

export const TaskAIStyle = {
  mt: 3,
  p: 2,
  width: "100%",
  color: "#fff",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",

  "& .tags": {
    mb: 3,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    "& .MuiChip-colorDefault": {
      backgroundColor: "#000",
      color: "#fff",
      "& svg path": {
        fill: "#fff",
      },
    },
  },

  "& .task-items": {
    mt: 3,
    display: "grid",
    // flexWrap: "wrap",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 2,
    // overflowY: "scroll",
    "& .card-item": {
      backgroundColor: "#000000",
      color: "#fff",
      borderRadius: "5px",
      flex: "20%",
      "& .card-icons": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
    },
    "& .card-img": {
      pb: 1,
      //   width: "100px",
      width: "100%",
      marginLeft: "calc( 100% - 105px )",
    },

    "& .mini-icon": {
      //   width: "50px",
      width: "100%",
      height: "auto",
      backgroundColor: "transparent",
      marginBottom: "10px",
    },
    "& .mini-icon.right": {
      position: "absolute",
      right: "20px",
      top: "20px",
      width: "24px",
      height: "24px",
      backgroundColor: "transparent",
    },
  },
};

export const claimOfferStyle = {
  background: "#3A7DAD",
  color: "#fff",
  borderRadius: "10px",
  "& > div": {
    maxWidth: "100%",
    display: "flex",
    background: "transparent",
    alignItems: "center",
    minHeight: "150px",
    color: "#fff",
  },

  "& .robot-image": {
    backgroundRepeat: "no-repeat!important",
    width: "150px",
  },
  "& .MuiCardContent-root": {},
  "& .got-arrow": {
    position: "absolute",
    right: "100px",
  },
};

export const premiumModalStyle = {
  position: "absolute",
  top: "4%",
  left: "0",
  right: "0",
  margin: "0 auto",
  // transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: "background.paper",
  minHeight: "35vh",
  pt: 40,
  px: 4,
  pb: 7,
  borderRadius: 1,
  backgroundColor: "#23303a",
  color: "#fff",
  backgroundImage:
    "url(images/sci_fi_lady.webp), linear-gradient(rgba(6, 12, 19, 0.11111111), rgba(7, 24, 38, 0.1))",
  backgroundRepeat: "no-repeat",
  backgroundBlendMode: "overlay",

  "& .pro-text": {
    padding: "0 5px",
    backgroundColor: "#005BFF",
    borderRadius: 2,
  },

  "& .tags": {
    mb: 3,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    "& .MuiChip-filled": {
      borderRadius: 1,
      p: 1,
      height: "auto",
      backgroundColor: "#000002",
      "& .MuiAvatar-root": {
        backgroundColor: "transparent",
      },
      "& .title": {
        fontSize: "12px",
        textTransform: "uppercase",
      },
      "& .sub-title": {
        fontSize: "10px",
      },
    },
    "& .MuiChip-colorDefault": {
      p: 2,
      backgroundColor: "#000",
      color: "#fff",
      "& svg path": {
        fill: "#fff",
      },
    },
  },

  "& .offer-price": {
    "& fieldset": {
      width: "100%",
      "& label": {
        mb: 4,
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        p: 1,
        pr: 6,
        position: "relative",
        mr: 0,
      },
    },
    "& .payment-option": {
      border: "1px solid #fff",
      borderRadius: 2,
      "& p.save-tag": {
        position: "absolute",
        top: "-26px",
        right: "33px",
        background: "#4FABEE",
        padding: " 4px 15px",
        borderRadius: " 10px",
        fontSize: "12px",
      },
      "& svg path": {
        fill: "#fff",
      },
    },
  },

  "& .close-button": {
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    p: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: "none",
    color: "#fff",
    "& span": {
      margin: 0,
    },
  },
};

export const feature = {
  p: 2,
  width: "100%",
  color: "#fff",
  display: "flex",
  flexDirection: "column",

  "& .mini-icon": {
    pb: 1,
    width: "50px",
    height: "auto",
    marginLeft: "calc( 100% - 105px )",
    backgroundColor: "transparent",
  },

  "& .tags": {},
};

export const messenger = {
  p: 2,
  width: "100%",

  "& .turbo-gpt-tab": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 1,
    "& button": {
      backgroundColor: "#08151F",
      color: "#fff",
      mr: 1,
      minHeight: "45px",
      borderRadius: "5px",
      "&.Mui-selected ": {
        backgroundColor: "#005CFF",
      },
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
  "& .message-reply-history": {
    backgroundColor: "#08151F",
    border: "1px solid #08151F",
    borderRadius: 2,
    padding: 2,
    height: "calc( 100vh - 230px )",
    overflowY: "auto",
    marginBottom: 2,
    "& p": {
      color: "#fff",
    },
  },
  "& .message-input": {
    display: "flex",
    alignItems: "center",
    "& input": {
      border: "1px solid #08151F",
      backgroundColor: "#08151F",
      color: "#fff",
      borderRadius: 1,
    },
  },
};
