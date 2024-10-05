"use client";

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
import { useUser } from "@clerk/nextjs";
import { getFavorites } from "@/utils/firebaseFunctions";
import { useState, useEffect } from "react";
import { useNavigationUtils } from "@/utils/navigationUtils";

export const DashboardSide = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const { handleHomeClick, handleDeckClick } = useNavigationUtils();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const userFavorites = await getFavorites(user.id);
        setFavorites(userFavorites);
      }
    };
    fetchFavorites();
  }, [user]);

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
        {favorites.length === 0 ? (
          <Typography
            sx={{
              px: 2,
              mt: 1,
              ml: 0.5,
              fontFamily: "Fondamento",
              color: "white",
            }}
          >
            No favorites yet.
          </Typography>
        ) : (
          favorites.map((deckName) => (
            <ListItemButton
              key={deckName}
              onClick={() => handleDeckClick(deckName)}
            >
              <ListItemIcon>
                <StarIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={deckName}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontFamily: "Fondamento",
                    color: "white",
                  },
                }}
              />
            </ListItemButton>
          ))
        )}
      </List>
    </Box>
  );
};
