"use client";

import React, { useState } from "react";
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
  AppBar,
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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigationUtils } from "@/utils/navigationUtils";
import { useParams } from "next/navigation";
import { Delete, Pencil } from "lucide-react";

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

  const generateNewCard = () => {
    // This is where you would integrate with OpenAI GPT
    // For now, we'll just add the prompt as a new card
    const newCard = { question: newCardPrompt, answer: "Generated answer" };
    setGeneratedCards([...generatedCards, newCard]);
    setNewCardPrompt("");
  };

  const handleEditCard = (index) => {
    setEditingCard(generatedCards[index]);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    const updatedCards = generatedCards.map((card) =>
      card === editingCard ? { ...editingCard } : card
    );
    setGeneratedCards(updatedCards);
    setEditDialogOpen(false);
  };

  const handleDeleteCard = (index) => {
    const updatedCards = generatedCards.filter((_, i) => i !== index);
    setGeneratedCards(updatedCards);
  };

  const toggleEnlarge = () => {
    setIsEnlarged(!isEnlarged);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 2 }}>
        <Container maxWidth="md">
          <Card
            sx={{
              mb: 2,
              position: "relative",
              ...(isEnlarged && {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                width: "80%",
                height: "80%",
                display: "flex",
                flexDirection: "column",
              }),
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
                zIndex: 999,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
              }}
            >
              <IconButton size="large" sx={{ color: "white" }}>
                <ChevronLeft />
              </IconButton>
              <IconButton size="large" sx={{ color: "white" }}>
                <ChevronRight />
              </IconButton>
            </Box>
          )}

          {/* Flashcard generation section */}

          {!isEnlarged && (
            <>
              <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter prompt to generate flashcards..."
                  value={newCardPrompt}
                  onChange={(e) => setNewCardPrompt(e.target.value)}
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
                  maxHeight: "calc(100vh - 300px)",
                  overflow: "hidden",
                  backgroundColor: "#4b6a2e",
                  color: "white",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontFamily: "Fondamento" }}
                >
                  Generated Flashcards
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search flashcards..."
                  value={searchTerm}
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
                      <InputAdornment position="start" sx={{ color: "white" }}>
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
                <List>
                  {generatedCards.map((card, index) => (
                    <ListItem key={index} divider>
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
              </Paper>

              <Dialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
              >
                <DialogTitle>Edit Flashcard</DialogTitle>
                <DialogContent>
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
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit}>Save</Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
