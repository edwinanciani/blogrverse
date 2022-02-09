import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

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
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const firestore = firebase.firestore()
export const storage = firebase.storage()

export const getUserWithUsername = async (username) => {
  const usersRef = firestore.collection('users')
  const query = usersRef.where('username', '==', username).limit(1)
  const userDoc = (await query.get()).docs[0]
  return userDoc
}

export function postToJSON(doc) {
  if(!doc) {
    return;
  }
  const data = doc.data()
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    created: data.created.toMillis(),
    modified: data.modified.toMillis(),
  };
}

export function toJSON(doc) {
  const data = doc.data()
  return data;
}
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;