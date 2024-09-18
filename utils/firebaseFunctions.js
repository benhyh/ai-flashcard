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
import { toast } from "react-toastify";

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
    console.error("Deck already exists!");
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

export const deleteSubDeck = async (deckName, subDeckName) => {
  try {
    const parentDocRef = doc(fireStore, "folders", deckName);
    const subDecksCollectionRef = collection(parentDocRef, "subDecks");

    const querySnapshot = await getDocs(subDecksCollectionRef);
    const subDeckDoc = querySnapshot.docs.find(
      (doc) => doc.data().name === subDeckName
    );

    if (subDeckDoc) {
      await deleteDoc(subDeckDoc.ref);
    }
  } catch (error) {
    console.error("Error deleting deck:", error);
    throw error;
  }
};

export const updateFlashcards = async (deckName, subDeckName) => {
  const flashcardsCollectionRef = collection(
    fireStore,
    "folders",
    deckName,
    "subDecks",
    subDeckName,
    "flashcards"
  );
  const snapshot = query(flashcardsCollectionRef);
  const documents = await getDocs(snapshot);
  const flashcardsList = [];
  documents.docs.map((doc) => {
    flashcardsList.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return flashcardsList;
};
