"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ArrowBack,
  ChevronLeft,
  ChevronRight,
  Edit,
  Fullscreen,
  FullscreenExit,
  Search,
} from "@mui/icons-material";
import {
  Toolbar,
  IconButton,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Container,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  InputAdornment,
  Stack,
  styled,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigationUtils } from "@/utils/navigationUtils";
import { useParams } from "next/navigation";
import { Delete, Pencil } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { fireStore } from "@/firebase";
import "react-toastify/dist/ReactToastify.css";
import { updateFlashcards } from "@/utils/firebaseFunctions";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const ScrollableStack = styled(Stack)(({ theme }) => ({
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
}));

const theme = createTheme({
  palette: {
    background: {
      default: "radial-gradient(closest-corner, #4b6a2e, #242e21)",
    },
  },
});

export default function FlashcardUI() {
  const [question, setQuestion] = useState("Start generating some flashcards!");
  const [newCardPrompt, setNewCardPrompt] = useState("");
  const [generatedCards, setGeneratedCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const { handleBackToDeck } = useNavigationUtils();
  const { deckName, subDeckName } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const generateNewCard = async () => {
    if (newCardPrompt.trim() === "") {
      toast.error("Please enter a prompt to generate a flashcard.", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          fontFamily: "Fondamento",
          background: "#4b6a2e",
          color: "white",
        },
        progressStyle: {
          background: "#8fbc8f",
        },
      });
      setNewCardPrompt("");
      return;
    }

    setNewCardPrompt("");

    try {
      toast.info("Generating flashcards...", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          fontFamily: "Fondamento",
          background: "#4b6a2e",
          color: "white",
        },
        progressStyle: {
          background: "#8fbc8f",
        },
      });

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: newCardPrompt }),
      });

      const data = await response.json();
      const newFlashCards = Array.isArray(data.flashcards)
        ? data.flashcards
        : [data.flashcards];

      if (response.ok) {
        const flashCardsCollectionRef = collection(
          fireStore,
          "folders",
          deckName,
          "subDecks",
          subDeckName,
          "flashcards"
        );

        for (const card of newFlashCards) {
          await addDoc(flashCardsCollectionRef, {
            question: card.front,
            answer: card.back,
          });
        }

        toast.success("Flashcards generated successfully!", {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: {
            fontFamily: "Fondamento",
            background: "#4b6a2e",
            color: "white",
          },
          progressStyle: {
            background: "#8fbc8f",
          },
        });

        const updatedFlashcards = await updateFlashcards(deckName, subDeckName);
        setGeneratedCards(updatedFlashcards);
      } else {
        toast.error("Failed to generate flashcards", {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: {
            fontFamily: "Fondamento",
            background: "#4b6a2e",
            color: "white",
          },
          progressStyle: {
            background: "#8fbc8f",
          },
        });
      }
    } catch (error) {
      toast.dismiss();

      console.error("Error generating flashcards:", error);
      toast.error(`Error: ${error.message}`, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          fontFamily: "Fondamento",
          background: "#4b6a2e",
          color: "white",
        },
        progressStyle: {
          background: "#8fbc8f",
        },
      });
    }
  };

  const handleEditCard = (index) => {
    setEditingCard(generatedCards[index]);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingCard) return;

    const flashcardRef = doc(
      fireStore,
      "folders",
      deckName,
      "subDecks",
      subDeckName,
      "flashcards",
      editingCard.id
    );
    await updateDoc(flashcardRef, {
      question: editingCard.front,
      answer: editingCard.back,
    });

    const updatedCards = generatedCards.map((card) =>
      card === editingCard ? { ...editingCard } : card
    );
    setGeneratedCards(updatedCards);
    setEditDialogOpen(false);
  };

  const handleDeleteCard = async (index) => {
    const flashcardRef = doc(
      fireStore,
      "folders",
      deckName,
      "subDecks",
      subDeckName,
      "flashcards",
      generatedCards[index].id
    );
    await deleteDoc(flashcardRef);

    const updatedCards = generatedCards.filter((_, i) => i !== index);
    setGeneratedCards(updatedCards);
  };

  const fetchFlashcards = useCallback(async () => {
    const flashcards = await updateFlashcards(deckName, subDeckName);
    if (flashcards) setGeneratedCards(flashcards);
  }, [deckName, subDeckName]);

  const toggleEnlarge = () => {
    setIsEnlarged(!isEnlarged);
  };

  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards, generatedCards]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 2 }}>
        <Container maxWidth="md">
          <Card
            sx={{
              mb: 2,
              position: "relative",
            }}
          >
            <Box sx={{ bgcolor: "#4b6a2e" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="back"
                  onClick={() => handleBackToDeck(deckName)}
                  sx={{ color: "white" }}
                >
                  <ArrowBack />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{
                    flexGrow: 1,
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Fondamento",
                  }}
                >
                  {subDeckName}
                </Typography>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="settings"
                  sx={{ color: "white" }}
                >
                  <Pencil />
                </IconButton>
              </Toolbar>
            </Box>
            <CardContent sx={{ p: 8 }}>
              <Typography variant="h5" component="div" align="center">
                {question}
              </Typography>
            </CardContent>
            <IconButton
              onClick={toggleEnlarge}
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
              }}
            >
              {isEnlarged ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
          </Card>

          {isEnlarged && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(20px)",
                zIndex: 999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                sx={{ color: "white", position: "absolute", left: 20 }}
              >
                <ChevronLeft />
              </IconButton>
              <Card
                sx={{
                  width: "80%",
                  height: "80%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Typography variant="h5" component="div" align="center">
                  {question}
                </Typography>
                <IconButton
                  onClick={toggleEnlarge}
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                  }}
                >
                  <FullscreenExit />
                </IconButton>
              </Card>
              <IconButton
                size="large"
                sx={{ color: "white", position: "absolute", right: 20 }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          )}

          {/* Flashcard generation section */}

          {!isEnlarged && (
            <>
              <Box sx={{ display: "flex", gap: 1, mb: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter prompt to generate flashcards..."
                  value={newCardPrompt}
                  onChange={(e) => setNewCardPrompt(e.target.value)}
                  autoComplete="off"
                  inputProps={{
                    autoComplete: "off",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                  sx={{
                    color: "white",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                      fontFamily: "Fondamento",
                    },
                  }}
                />
                <ToastContainer />
                <Button
                  variant="contained"
                  onClick={generateNewCard}
                  sx={{
                    color: "white",
                    backgroundColor: "#4b6a2e",
                    fontFamily: "Fondamento",
                    "&:hover": {
                      backgroundColor: "#374c28",
                    },
                  }}
                >
                  Generate
                </Button>
              </Box>
              <Paper
                sx={{
                  p: 3,
                  mb: 2,
                  maxHeight: "calc(85vh - 270px)",
                  overflow: "hidden",
                  backgroundColor: "#4b6a2e",
                  color: "white",
                  border: "2px solid white",
                }}
              >
                <Toolbar
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "Fondamento",
                      flexGrow: 1,
                      mr: 2,
                    }}
                  >
                    Generated Flashcards
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Search flashcards..."
                    value={searchTerm}
                    autoComplete="off"
                    inputProps={{
                      autoComplete: "off",
                      form: {
                        autoComplete: "off",
                      },
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                      color: "white",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                        fontFamily: "Fondamento",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ color: "white" }}
                        >
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Toolbar>

                <ScrollableStack
                  spacing={2}
                  sx={{
                    overflowY: "auto",
                    maxHeight: "calc(100vh - 300px)",
                    mt: 2,
                  }}
                >
                  <List>
                    {generatedCards.map((card, index) => (
                      <ListItem key={card.id || index} divider>
                        <ListItemText
                          primary={card.question}
                          secondary={card.answer}
                          sx={{ color: "white" }}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => handleEditCard(index)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteCard(index)}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </ScrollableStack>
              </Paper>

              <Dialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                sx={{
                  "& .MuiDialog-paper": {
                    backgroundColor: "#4b6a2e",
                    color: "white",
                    border: "1px solid white",
                  },
                }}
              >
                <DialogTitle sx={{ fontFamily: "Fondamento" }}>
                  Edit Flashcard
                </DialogTitle>
                <DialogContent sx={{ color: "white" }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Question"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={editingCard?.question || ""}
                    onChange={(e) =>
                      setEditingCard({
                        ...editingCard,
                        question: e.target.value,
                      })
                    }
                    autoComplete="off"
                    sx={{
                      color: "white",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                        fontFamily: "Fondamento",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                      },
                    }}
                  />
                  <TextField
                    margin="dense"
                    label="Answer"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={editingCard?.answer || ""}
                    onChange={(e) =>
                      setEditingCard({ ...editingCard, answer: e.target.value })
                    }
                    autoComplete="off"
                    sx={{
                      color: "white",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                        fontFamily: "Fondamento",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                      },
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setEditDialogOpen(false)}
                    sx={{
                      color: "white",
                      fontFamily: "Fondamento",
                      "&:hover": {
                        color: "#4b6a2e",
                        fontWeight: "bold",
                        backgroundColor: "white",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    sx={{
                      color: "white",
                      fontFamily: "Fondamento",
                      "&:hover": {
                        color: "#4b6a2e",
                        fontWeight: "bold",
                        backgroundColor: "white",
                      },
                    }}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
