// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDujOQaMVIxI-Q9ZLkJZa_jrbKDUh-4_cY",
  authDomain: "flashcard-saas-ace9b.firebaseapp.com",
  projectId: "flashcard-saas-ace9b",
  storageBucket: "flashcard-saas-ace9b.appspot.com",
  messagingSenderId: "1007785305060",
  appId: "1:1007785305060:web:d5d5f8107b497fc9bc9df1",
  measurementId: "G-HEWY9C4Y13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);

export { fireStore };
