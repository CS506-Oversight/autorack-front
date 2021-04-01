import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: '',
  projectId: process.env.REACT_APP_FIREBASE_PROJ_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SEND_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// About import: https://stackoverflow.com/q/50707211/11571888
const fireAuth = firebase.initializeApp(firebaseConfig).auth();

export default fireAuth;
