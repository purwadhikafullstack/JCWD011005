// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCjdKPRtJ8A9rTvyJIpLkFNYU2DGFBHT_E",
  authDomain: "property-renting.firebaseapp.com",
  projectId: "property-renting",
  storageBucket: "property-renting.appspot.com",
  messagingSenderId: "620646968083",
  appId: "1:620646968083:web:40f17dc6202594af8048e6"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

// export const auth = getAuth(app);
// export default app;
const auth = getAuth(app);
module.exports = auth;
module.exports.default = app;