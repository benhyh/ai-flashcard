import {
  addDoc,
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

export const updateSubDeck = async (deckName) => {
  const deckDocRef = doc(fireStore, "folders", deckName);
  const subDecksCollectionRef = collection(deckDocRef, "subDecks");
  const snapshot = query(subDecksCollectionRef);
  const subDocuments = await getDocs(snapshot);
  const subDeckList = [];
  subDocuments.forEach((doc) => {
    subDeckList.push({
      id: doc.id,
      name: doc.data().name || doc.id,
      ...doc.data(),
    });
  });
  return subDeckList;
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
      parent: "folders",
      path: [],
    };

    await setDoc(docRef, newFolderData);
    return await updateDeck();
  } else {
    console.log("Folder already exists.");
    return null;
  }
};

export const addSubDeck = async (deckName, subDeckName) => {
  const deckDocRef = doc(fireStore, "folders", deckName);
  const subDecksCollectionRef = collection(deckDocRef, "subDecks");
  await addDoc(subDecksCollectionRef, {
    name: subDeckName,
    parent: deckName,
    createdAt: Timestamp.now(),
  });
  return updateSubDeck(deckName);
};

export const deleteDeck = async (deck) => {
  try {
    const docRef = doc(collection(fireStore, "folders"), deck);
    await deleteDoc(docRef);
    return await updateDeck();
  } catch (error) {
    console.error("Error deleting deck:", error);
    throw error;
  }
};

export const deleteSubDeck = async (deck, subDeck) => {
  try {
    const docRef = doc(
      collection(doc(fireStore, "folders", deck), deck),
      subDeck
    );
    await deleteDoc(docRef);
    return await updateSubDeck();
  } catch (error) {
    console.error("Error deleting deck:", error);
    throw error;
  }
};
