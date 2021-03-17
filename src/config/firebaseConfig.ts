import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: '',
  projectId: process.env.FIREBASE_PROJ_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SEND_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const fireAuth = firebase.initializeApp(firebaseConfig).auth();

export default fireAuth;
