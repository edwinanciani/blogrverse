import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC15sC2t6M8nSog_mImX08vEdnzNQzbTfw",
  authDomain: "blog-b6fdf.firebaseapp.com",
  projectId: "blog-b6fdf",
  storageBucket: "blog-b6fdf.appspot.com",
  messagingSenderId: "950820055852",
  appId: "1:950820055852:web:3241a1eae1df5bd5fd1a89",
  measurementId: "G-J1GD5DJ4N7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// Initialize Firebase
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
