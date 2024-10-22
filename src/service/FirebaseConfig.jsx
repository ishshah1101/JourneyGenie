// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-QVm5UG5mrAWLmgtRVtwV7ec0jeUQtBo",
  authDomain: "journey-genie-79ef6.firebaseapp.com",
  projectId: "journey-genie-79ef6",
  storageBucket: "journey-genie-79ef6.appspot.com",
  messagingSenderId: "651625039161",
  appId: "1:651625039161:web:4ad5f754ee68492bc314e8",
  measurementId: "G-ZMHH9ZSYC0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
// const analytics = getAnalytics(app);

import { getStorage } from "firebase/storage";

// Initialize Firebase Storage
export const storage = getStorage(app);