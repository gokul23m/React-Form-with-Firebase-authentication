// Import the functions you need 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsYtQiCaQJL-p788MZvhfjPvE65NeGgfY",
  authDomain: "cr-proj-2303.firebaseapp.com",
  databaseURL: "https://cr-proj-2303-default-rtdb.firebaseio.com",
  projectId: "cr-proj-2303",
  storageBucket: "cr-proj-2303.appspot.com",
  messagingSenderId: "663207276243",
  appId: "1:663207276243:web:140b0502d5a4386f952e26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;