import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "writeup-ec149.firebaseapp.com",
  projectId: "writeup-ec149",
  storageBucket: "writeup-ec149.appspot.com",
  messagingSenderId: "43892811546",
  appId: "1:43892811546:web:4314cde0a6f84b0a4e6ea3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage()