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
import { fireStore } from "@/firebase";

export const updateDeck = async () => {
  const snapshot = query(collection(fireStore, "folders"));
  const documents = await getDocs(snapshot);
  const deckList = [];
  documents.docs.map((doc) => {
    deckList.push({
      name: doc.id,
      ...doc.data(),
    });
  });
  return deckList;
};

export const addDeck = async (deck, user) => {
  const docRef = doc(collection(fireStore, "folders"), deck);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    const newFolderData = {
      createdAt: Timestamp.now(),
      createdBy: user.fullName,
      userID: user.id,
      name: deck,
      parent: "home",
      path: [],
    };

    await setDoc(docRef, newFolderData);
    return await updateDeck();
  } else {
    console.log("Folder already exists.");
    return null;
  }
};

export const deleteDeck = async (folder) => {
  try {
    const docRef = doc(collection(fireStore, "folders"), folder);
    await deleteDoc(docRef);
    return await updateDeck();
  } catch (error) {
    console.error("Error deleting deck:", error);
    throw error;
  }
};
