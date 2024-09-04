"use client";

import { useState } from "react";
import { AppBar, Toolbar, Drawer, Box } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import DashboardSide from "./DashboardSide";
import DashboardExit from "./DashboardExit";
import DashboardMain from "./DashboardMain";
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
} from "firebase/firestore";

const Dashboard = () => {
  const { isLoaded, user } = useUser();
  const [folderName, setFolderName] = useState([]);
  const [folder, setFolder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false); // Modal box handling state.

  const handleOpen = () => setOpen(true); // Handle open.
  const handleClose = () => setOpen(false); // Handle close.

  // Fetching data from Firebase and updating it
  const updateFolder = async () => {
    const snapshot = query(collection(fireStore, "folders"));
    const documents = await getDocs(snapshot);
    const folderList = [];
    documents.forEach((document) => {
      folderList.push({
        name: document.id,
        ...document.data(),
      });
    });
    setFolderName(folderList);
  };

  // Create folder
  const addFolder = async (item) => {
    const docRef = doc(collection(fireStore, "folders"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await setDoc(docRef);
    }

    await updateFolder();
  };

  // Delete folder
  const deleteFolder = async (item) => {
    const docRef = doc(collection(fireStore, "folders"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(docRef);
    }

    await updateFolder();
  };

  // Search functionality
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = folderName.filter((item) =>
    item.name
      .toLowerCase()
      .split(" ")
      .some((word) => word.startsWith(searchQuery.toLowerCase()))
  );

  // For loading state for clerk auth.
  if (!isLoaded) {
    return null;
  }

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
          setFolder={setFolder}
          addFolder={addFolder}
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
        folder={folder}
        setFolder={setFolder}
        addFolder={addFolder}
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default Dashboard;
