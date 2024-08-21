import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyBWj1l0p6Bs_9lOmwjjQMS4AZhJV13C5CQ",
  authDomain: "weather-dashboard-8de62.firebaseapp.com",
  projectId: "weather-dashboard-8de62",
  storageBucket: "weather-dashboard-8de62.appspot.com",
  messagingSenderId: "1083195919302",
  appId: "1:1083195919302:web:265f691d3aa9de10b0c0c7",
  measurementId: "G-QNVHHCEFK6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);  
const auth = getAuth(app); 

export const googleAuthProvider = new GoogleAuthProvider();


export { db, auth }; 
