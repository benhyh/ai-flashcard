"use client";

import { useEffect, useState } from "react";
import { AppBar, Toolbar, Drawer, Box } from "@mui/material";
import { DashboardSide } from "./DashboardSide";
import { DashboardExit } from "./DashboardExit";
import { DashboardMain } from "./DashboardMain";
import { DashboardBar } from "./DashboardBar";
import { updateDeck, addDeck, deleteDeck } from "@/utils/firebaseFunctions";
import { useRouter } from "next/navigation";

const Dashboard = ({ user, isLoaded }) => {
  const [deckName, setDeckName] = useState([]);
  const [deck, setDeck] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeckClick = (deckName) => {
    router.push(`/dashboard/deck/${deckName}`);
  };

  const fetchDecks = async () => {
    const deckList = await updateDeck();
    setDeckName(deckList);
  };

  const handleAddDeck = async (deck) => {
    const updatedDecks = await addDeck(deck, user);
    if (updatedDecks) setDeckName(updatedDecks);
  };

  const handleDeleteDeck = async (folder) => {
    try {
      const updatedDecks = await deleteDeck(folder);
      if (updatedDecks) setDeckName(updatedDecks);
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = deckName.filter((item) =>
    item.name
      .toLowerCase()
      .split(" ")
      .some((word) => word.startsWith(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "black",
        }}
      >
        <DashboardBar
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
          setDeck={setDeck}
          addDeck={handleAddDeck}
        />
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
        <DashboardSide />
        <DashboardExit />
      </Drawer>
      <DashboardMain
        user={user}
        deck={deck}
        setDeck={setDeck}
        addDeck={handleAddDeck}
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        deckName={deckName}
        deleteDeck={handleDeleteDeck}
        deckClick={handleDeckClick}
      />
    </Box>
  );
};

export default Dashboard;
