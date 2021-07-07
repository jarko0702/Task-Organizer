import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApbWy7yAp_9CbHDcAU0Rk1gOV-angIhqI",
  authDomain: "task-organizer-ad6fe.firebaseapp.com",
  projectId: "task-organizer-ad6fe",
  storageBucket: "task-organizer-ad6fe.appspot.com",
  messagingSenderId: "89084774628",
  appId: "1:89084774628:web:89605f56569265c48444f1",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
