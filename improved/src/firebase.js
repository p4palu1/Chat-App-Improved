// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJT8-SJ84OekeiViI4FIJl1RfRKIxtAc8",
  authDomain: "improved-chat-app.firebaseapp.com",
  projectId: "improved-chat-app",
  storageBucket: "improved-chat-app.appspot.com",
  messagingSenderId: "757840409954",
  appId: "1:757840409954:web:c3745f18c9c5739b42283b",
  measurementId: "G-5F1YYXE11T"
};

// Initialize Firebase
const app =initializeApp(firebaseConfig);

export default getFirestore()
