import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg_9ORYVd3MXQ4V2QzlfMgyt4pDcgP7t8",
  authDomain: "lab4-2703e.firebaseapp.com",
  projectId: "lab4-2703e",
  storageBucket: "lab4-2703e.appspot.com",
  messagingSenderId: "552811253950",
  appId: "1:552811253950:web:502e6979a52166edc9ceef",
  measurementId: "G-BW4TJMLGC9",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth };
export { db };
