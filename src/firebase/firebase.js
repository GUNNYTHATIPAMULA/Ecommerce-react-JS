// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDB-MgfwZGdBtSVwzWV5cJfVhWj2qHl_Q",
  authDomain: "resume-maker-f1d5c.firebaseapp.com",
  projectId: "resume-maker-f1d5c",
  storageBucket: "resume-maker-f1d5c.appspot.com",
  messagingSenderId: "122594089832",
  appId: "1:122594089832:web:9c3d20755ab7ebc56cd4dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth , app,db}




// Your web app's Firebase configuration

