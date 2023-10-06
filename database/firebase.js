// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf8pBHiAipmm2yOadDf7BFlxJgC-8QVP0",
  authDomain: "lab6-9c9f6.firebaseapp.com",
  projectId: "lab6-9c9f6",
  storageBucket: "lab6-9c9f6.appspot.com",
  messagingSenderId: "263289335480",
  appId: "1:263289335480:web:01ddc73bcff4cdc1350e4d",
  measurementId: "G-GJE50E3NL3"
};

initializeApp(firebaseConfig);

export const database = getFirestore()

