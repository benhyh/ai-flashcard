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
  where,
  updateDoc,
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
      favorites: {},
    };

    await setDoc(docRef, newFolderData);
    return await updateDeck();
  } else {
    console.error("Deck already exists!");
    return null;
  }
};

export const addSubDeck = async (deckName, subDeckName, user) => {
  const deckDocRef = doc(fireStore, "folders", deckName);
  const subDecksCollectionRef = collection(deckDocRef, "subDecks");
  await addDoc(subDecksCollectionRef, {
    name: subDeckName,
    createdBy: user.fullName,
    userID: user.id,
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
  const subDeckRef = collection(fireStore, "folders", deckName, "subDecks");
  const subDeckQuery = query(subDeckRef, where("name", "==", subDeckName));
  const subDeckSnapshot = await getDocs(subDeckQuery);
  const subDeckDoc = subDeckSnapshot.docs[0];
  const flashcardsCollectionRef = collection(subDeckDoc.ref, "flashcards");
  const documents = await getDocs(flashcardsCollectionRef);
  const flashcardsList = [];
  documents.docs.map((doc) => {
    flashcardsList.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return flashcardsList;
};

export const handleDeleteFlashcard = async (
  deckName,
  subDeckName,
  index,
  generatedCards,
  setGeneratedCards
) => {
  const subDeckRef = collection(fireStore, "folders", deckName, "subDecks");
  const subDeckQuery = query(subDeckRef, where("name", "==", subDeckName));
  const subDeckSnapshot = await getDocs(subDeckQuery);
  const subDeckDoc = subDeckSnapshot.docs[0];
  const flashcardsCollectionRef = collection(subDeckDoc.ref, "flashcards");
  const flashCardRef = doc(flashcardsCollectionRef, generatedCards[index].id);

  await deleteDoc(flashCardRef);

  const updatedCards = generatedCards.filter((_, i) => i !== index);
  setGeneratedCards(updatedCards);
};

export const handleEditFlashcard = async (
  deckName,
  initialSubDeckName,
  editingCard
) => {
  const subDeckRef = collection(fireStore, "folders", deckName, "subDecks");
  const subDeckQuery = query(
    subDeckRef,
    where("name", "==", initialSubDeckName)
  );
  const subDeckSnapshot = await getDocs(subDeckQuery);
  const subDeckDoc = subDeckSnapshot.docs[0];
  const flashcardsCollectionRef = collection(subDeckDoc.ref, "flashcards");
  const flashCardRef = doc(flashcardsCollectionRef, editingCard.id);

  await updateDoc(flashCardRef, {
    answer: editingCard.answer,
    question: editingCard.question,
  });
};

export const handleChangeFlashcardName = async (
  deckName,
  subDeckName,
  editedName
) => {
  const subDeckRef = collection(fireStore, "folders", deckName, "subDecks");
  const subDeckQuery = query(subDeckRef, where("name", "==", subDeckName));
  const subDeckSnapshot = await getDocs(subDeckQuery);
  const subDeckDoc = subDeckSnapshot.docs[0].ref;

  await updateDoc(subDeckDoc, {
    name: editedName,
  });
};

export const handleChangeDeckName = async (deck, editedName) => {
  const docRef = doc(collection(fireStore, "folders"), deck);

  await setDoc(docRef, {
    name: editedName,
  });
};

export const handleChangeSubDeckName = async () => {};

export const toggleFavorite = async (deckName, userId, isFavorite) => {
  const deckRef = doc(fireStore, "folders", deckName);
  await updateDoc(deckRef, {
    [`favorites.${userId}`]: isFavorite,
  });
};

export const getFavorites = async (userId) => {
  const snapshot = await getDocs(collection(fireStore, "folders"));
  const favorites = [];
  snapshot.forEach((doc) => {
    if (doc.data().favorites && doc.data().favorites[userId] === true) {
      favorites.push(doc.id);
    }
  });
  return favorites;
};
