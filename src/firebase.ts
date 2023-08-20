import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrJj3aioe7lvCEu66fQhmtbqruvGvVVQk",
  authDomain: "clone-cp-5ea60.firebaseapp.com",
  projectId: "clone-cp-5ea60",
  storageBucket: "clone-cp-5ea60.appspot.com",
  messagingSenderId: "438660005260",
  appId: "1:438660005260:web:02982604030e1d698aeaa9",
  measurementId: "G-V6BY19X4DC",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
