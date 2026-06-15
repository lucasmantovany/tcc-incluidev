import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL-1-9aTuFrVL_sWBaXEajXvZRTSwaNu8",
  authDomain: "tcc-incluidev.firebaseapp.com",
  projectId: "tcc-incluidev",
  storageBucket: "tcc-incluidev.firebasestorage.app",
  messagingSenderId: "671045347657",
  appId: "1:671045347657:web:203c537859f75cd5e21298",
  measurementId: "G-D9G5M6TRGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
