// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWfqno1rIlSA0VzClLDOyxep6CJgX36eQ",
  authDomain: "chessgame-fbe3d.firebaseapp.com",
  projectId: "chessgame-fbe3d",
  storageBucket: "chessgame-fbe3d.appspot.com",
  messagingSenderId: "8016862768",
  appId: "1:8016862768:web:f16a54cf308ee32f5257f5"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);