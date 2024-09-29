"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  Button,
  Typography,
  Paper,
  LinearProgress,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import { Star, Pencil, Trash, Play } from "lucide-react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import { DashboardBar } from "../../DashboardBar";
import { DashboardSide } from "../../DashboardSide";
import { DashboardExit } from "../../DashboardExit";
import { useNavigationUtils } from "@/utils/navigationUtils";
import ModalBox from "../../ModalBox";
import {
  updateSubDeck,
  addSubDeck,
  deleteSubDeck,
} from "@/utils/firebaseFunctions";
import { useUser } from "@clerk/nextjs";

export default function DeckPage() {
  const { user } = useUser();
  const { deckName } = useParams();
  const [subDeckName, setSubDeckName] = useState([]);
  const [subDeck, setSubDeck] = useState("");
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { handleHomeClick, handleSubDeckClick } = useNavigationUtils();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFavoriteClick = async () => {
    if (!favorite) {
      setFavorite(true);
      setFavorites((prev) => [...prev, deckName]);
    } else {
      setFavorite(false);
      setFavorites((prev) => prev.filter((deck) => deck !== deckName));
    }
  };

  const fetchSubDecks = useCallback(async () => {
    const subDeckList = await updateSubDeck(deckName);
    if (subDeckList) setSubDeckName(subDeckList);
  }, [deckName]);

  const handleAddSubDeck = async (subDeck) => {
    const updatedDecks = await addSubDeck(deckName, subDeck, user);
    fetchSubDecks();
    if (updatedDecks) setSubDeckName(updatedDecks);
  };

  const handleDeleteDeck = async (subDeck) => {
    try {
      await deleteSubDeck(deckName, subDeck);
      const updatedSubDecks = await updateSubDeck(deckName);
      setSubDeckName(updatedSubDecks);
    } catch (error) {
      console.error("Error deleting decks:", error);
    }
  };

  useEffect(() => {
    fetchSubDecks();
  }, [fetchSubDecks]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "common.black",
        }}
      >
        <DashboardBar />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            border: "none",
          },
        }}
      >
        <Toolbar />
        <DashboardSide
          handleHomeClick={handleHomeClick}
          favorites={favorites}
        />
        <DashboardExit />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8, overflow: "auto" }}>
        <Box sx={{ mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              mb: 3,
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                variant="h3"
                mb={0.5}
                sx={{ fontFamily: "Fondamento" }}
              >
                {deckName}
              </Typography>

              <Box sx={{ mt: 1.2, ml: 2 }}>
                <IconButton onClick={handleFavoriteClick}>
                  {!favorite ? (
                    <Star color="white" />
                  ) : (
                    <Star fill="yellow" color="yellow" />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              sx={{
                padding: 1.5,
                color: "white",
                backgroundColor: "#4b6a2e",
                fontFamily: "Fondamento",
                "&:hover": {
                  backgroundColor: "#374c28",
                },
              }}
            >
              Play
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{
                padding: 1.5,
                ml: 2,
                color: "white",
                borderColor: "black",
                color: "white",
                borderColor: "white",
                fontFamily: "Fondamento",
                "&:hover": {
                  borderColor: "#8FBC8F",
                  color: "#8FBC8F",
                },
              }}
              onClick={() => {
                handleOpen();
              }}
            >
              New Deck
            </Button>
            <Modal open={open} onClose={handleClose}>
              <ModalBox
                handleClose={handleClose}
                value={subDeck}
                onSubmit={handleAddSubDeck}
                onChange={setSubDeck}
              />
            </Modal>
          </Box>

          {subDeckName.map((subDeck, index) => (
            <Paper
              sx={{
                mb: 3,
                bgcolor: "#4b6a2e",
                borderRadius: "10px",
              }}
              key={index}
            >
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: { xs: 2, sm: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "success.light",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                        "&:hover": {
                          bgcolor: "success.dark",
                        },
                      }}
                    >
                      <Button disableRipple>
                        <Play
                          size={16}
                          color="white"
                          fill="white"
                          onClick={() =>
                            handleSubDeckClick(deckName, subDeck.name)
                          }
                        />
                      </Button>
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="semi-bold"
                        sx={{ fontFamily: "fondamento", color: "white" }}
                      >
                        {subDeck.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton size="small" sx={{ color: "white" }}>
                      <Pencil />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: "white" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDeck(subDeck.name);
                      }}
                    >
                      <Trash />
                    </IconButton>
                  </Box>
                </Box>
                <LinearProgress
                  variant="indeterminate"
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "white", // Color of the progress bar
                    },
                    backgroundColor: "gray", // Color of the background bar
                  }}
                />
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
