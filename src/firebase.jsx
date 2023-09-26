import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLhw5S4sq93W-igSafvdXuELLuvY9Wd8A",
  authDomain: "devlinksit313.firebaseapp.com",
  projectId: "devlinksit313",
  storageBucket: "devlinksit313.appspot.com",
  messagingSenderId: "810622540037",
  appId: "1:810622540037:web:7eef593e538d790c74ff6c",
  measurementId: "G-FM4J2RTHP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  analytics, 
  database, 
  db, 
  storage, 
  app as firebase,
  signInWithPhoneNumber,
  RecaptchaVerifier
};

export const logout = () => {
  return signOut(auth);
};

export const listenToAuthChanges = (userCallback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userCallback(user); // User is logged in
    } else {
      userCallback(null); // User is logged out
    }
  });
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};
