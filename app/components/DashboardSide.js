import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";

import {
  Home as HomeIcon,
  Folder as FolderIcon,
  Star as StarIcon,
} from "@mui/icons-material";

const DashboardSide = () => {
  return (
    <Box
      sx={{
        overflow: "auto",
        backgroundColor: "#4b6a2e",
        height: "100%",
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        sx={{ px: 2, mt: 2, fontFamily: "Fondamento", color: "white" }}
      >
        Menu
      </Typography>
      <List>
        <ListItem button sx={{ mb: 1 }}>
          <ListItemIcon>
            <HomeIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <Typography
            sx={{
              fontFamily: "Fondamento",
              fontSize: "1.2rem",
              color: "white",
            }}
          >
            Home
          </Typography>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FolderIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <Typography
            sx={{
              fontFamily: "Fondamento",
              fontSize: "1.2rem",
              color: "white",
            }}
          >
            Folders
          </Typography>
        </ListItem>
      </List>
      <Typography
        variant="h4"
        sx={{ px: 2, mt: 20, fontFamily: "Fondamento", color: "white" }}
      >
        Favorites
      </Typography>
      <List>
        {["General", "Java", "Codes"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <StarIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{
                "& .MuiListItemText-primary": {
                  fontFamily: "Fondamento",
                  color: "white",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DashboardSide;
