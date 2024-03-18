import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCUmCxWEh6delwT80b-8Y23Hyk9aSObexo",
  authDomain: "music-16d2a.firebaseapp.com",
  projectId: "music-16d2a",
  storageBucket: "music-16d2a.appspot.com",
  messagingSenderId: "134892352117",
  appId: "1:134892352117:web:c52f0728a8185bc88a3e3c"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error: ${error.code}` )
});

const usersCollection = db.collection("users");
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage
};
