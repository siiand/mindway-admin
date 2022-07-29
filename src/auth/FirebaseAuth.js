import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "configs/FirebaseConfig";
import "firebase/functions";
firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const storageRef = firebase.storage();
const currentUser = auth.currentUser;
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const functions = firebase.functions();
export {
  firebase,
  functions,
  db,
  auth,
  storageRef,
  currentUser,
  googleAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
  githubAuthProvider,
};
