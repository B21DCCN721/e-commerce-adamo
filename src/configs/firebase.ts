// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4KNkmx4PcYD3fNRvbOa3TYjlb3fWNbsc",
  authDomain: "e-commerce-8dfcf.firebaseapp.com",
  projectId: "e-commerce-8dfcf",
  storageBucket: "e-commerce-8dfcf.firebasestorage.app",
  messagingSenderId: "809492024555",
  appId: "1:809492024555:web:a34c59932b618a369a02ae",
  measurementId: "G-00C5JX2CPL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);