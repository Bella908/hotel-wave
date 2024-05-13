// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDw4dHHcbktzC8oNFq1hI3ML-XoyI3kcY",
  authDomain: "hotel-wave-fc64e.firebaseapp.com",
  projectId: "hotel-wave-fc64e",
  storageBucket: "hotel-wave-fc64e.appspot.com",
  messagingSenderId: "936261364710",
  appId: "1:936261364710:web:e8d6f840da85aeb1228427"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth