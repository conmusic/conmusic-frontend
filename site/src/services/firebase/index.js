// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACB53YvyquuL82rkJb76NydQjSKoLy760",
  authDomain: "conmusic-e7d60.firebaseapp.com",
  projectId: "conmusic-e7d60",
  storageBucket: "conmusic-e7d60.appspot.com",
  messagingSenderId: "249758689826",
  appId: "1:249758689826:web:3cde0f879ac32cf3d8f87b",
  measurementId: "G-4NWTKQLCJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;