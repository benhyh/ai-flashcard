"use client";

import { useEffect, useState } from "react";
import { AppBar, Toolbar, Drawer, Box } from "@mui/material";
import { DashboardSide } from "./DashboardSide";
import { DashboardExit } from "./DashboardExit";
import { DashboardMain } from "./DashboardMain";
import { DashboardBar } from "./DashboardBar";
import { fireStore } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";

const Dashboard = ({ user, isLoaded }) => {
  const [deckName, setDeckName] = useState([]);
  const [deck, setDeck] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Search box.
  const [open, setOpen] = useState(false); // Modal box handling state.

  const handleOpen = () => setOpen(true); // Handle open.
  const handleClose = () => setOpen(false); // Handle close.

  // Fetching data from Firebase and updating it
  const updateDeck = async () => {
    const snapshot = query(collection(fireStore, "folders"));
    const documents = await getDocs(snapshot);
    const deckList = [];
    documents.docs.map((doc) => {
      deckList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setDeckName(deckList);
  };

  // Create deck
  const addDeck = async (folder) => {
    const docRef = doc(collection(fireStore, "folders"), folder);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      const newFolderData = {
        createdAt: Timestamp.now(),
        name: folder,
        parent: "home",
        path: [],
      };

      await setDoc(docRef, newFolderData);
      await updateDeck();
    } else {
      console.log("Folder already exists.");
    }
  };

  // Delete deck
  const deleteDeck = async (folder) => {
    try {
      const docRef = doc(collection(fireStore, "folders"), folder);
      await deleteDoc(docRef);
      await updateDeck();
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  // Search
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
    updateDeck();
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
          addDeck={addDeck}
        />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
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
        addDeck={addDeck}
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        deckName={deckName}
        deleteDeck={deleteDeck}
      />
    </Box>
  );
};

export default Dashboard;
