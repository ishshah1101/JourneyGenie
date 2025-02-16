import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-QVm5UG5mrAWLmgtRVtwV7ec0jeUQtBo",
  authDomain: "journey-genie-79ef6.firebaseapp.com",
  projectId: "journey-genie-79ef6",
  storageBucket: "journey-genie-79ef6.appspot.com",
  messagingSenderId: "651625039161",
  appId: "1:651625039161:web:4ad5f754ee68492bc314e8",
  measurementId: "G-ZMHH9ZSYC0",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { getStorage } from "firebase/storage";

export const storage = getStorage(app);
