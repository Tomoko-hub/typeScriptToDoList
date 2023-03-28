import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL:process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STRAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
  });

  export const db = firebaseApp.firestore();
  export const auth = firebase.auth();