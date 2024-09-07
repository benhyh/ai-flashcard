import React from "react";
import {
  Typography,
  List,
  ListItemIcon,
  ListItemText,
  Box,
  ListItemButton,
} from "@mui/material";

import {
  Home as HomeIcon,
  Folder as FolderIcon,
  Star as StarIcon,
} from "@mui/icons-material";

export const DashboardSide = ({ handleHomeClick }) => {
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
        <ListItemButton onClick={handleHomeClick} sx={{ mb: 1 }}>
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
        </ListItemButton>
        <ListItemButton>
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
            Decks
          </Typography>
        </ListItemButton>
      </List>
      <Typography
        variant="h4"
        sx={{ px: 2, mt: 20, fontFamily: "Fondamento", color: "white" }}
      >
        Favorites
      </Typography>
      <List>
        {["General", "Java", "Codes"].map((text, index) => (
          <ListItemButton key={text}>
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
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
