import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc5YJKaCw8js8OOD2rJ3zA0297yoioy0w",
  authDomain: "lab5-4006f.firebaseapp.com",
  projectId: "lab5-4006f",
  storageBucket: "lab5-4006f.appspot.com",
  messagingSenderId: "1083274006159",
  appId: "1:1083274006159:web:1520bf56dffb7ccd68aafa",
  measurementId: "G-L06P8PL2DL",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth };
export { db };
