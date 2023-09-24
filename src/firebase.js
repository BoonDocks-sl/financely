// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbbXveukVpiyjnnyJfvCOSu2xxA0wL-rU",
    authDomain: "personal-finance-tracker-fa849.firebaseapp.com",
    projectId: "personal-finance-tracker-fa849",
    storageBucket: "personal-finance-tracker-fa849.appspot.com",
    messagingSenderId: "229051098078",
    appId: "1:229051098078:web:a45e4c5b9929956ad1b34f",
    measurementId: "G-DVE9PTXEHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };