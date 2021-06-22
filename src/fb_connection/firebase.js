import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

export const loginProviders={
  Google: new firebase.auth.GoogleAuthProvider()
}

/*const app = firebase.initializeApp({
  apiKey: "AIzaSyABgGSGac0U8MWMhU8aWk1VDb0jlPAY424",
  authDomain: "entregas-demo.firebaseapp.com",
  projectId: "entregas-demo",
  storageBucket: "entregas-demo.appspot.com",
  messagingSenderId: "544684579999",
  appId: "1:544684579999:web:95bdaf5caedbfbe5af16aa",
  measurementId: "G-3QXT52WJBC"
});*/

export const firestore = app.firestore();
export const auth = app.auth();
export default app;