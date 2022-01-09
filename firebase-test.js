// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_xwjYIu3sHs2dtkuP9b2r9Lk2HylHelo",
  authDomain: "test-tracker-med.firebaseapp.com",
  projectId: "test-tracker-med",
  storageBucket: "test-tracker-med.appspot.com",
  messagingSenderId: "154963005702",
  appId: "1:154963005702:web:af60b7773497e5638d4e87",
  measurementId: "G-1QQ9BE62T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);