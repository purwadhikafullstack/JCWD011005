// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKJ9HdCc_2792uZV7Cl5w08HhB0fAxiQ4",
  authDomain: "pro-rent-12df6.firebaseapp.com",
  projectId: "pro-rent-12df6",
  storageBucket: "pro-rent-12df6.appspot.com",
  messagingSenderId: "436851279120",
  appId: "1:436851279120:web:fe67122eade883240dd195",
  measurementId: "G-82FJKRF47G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()