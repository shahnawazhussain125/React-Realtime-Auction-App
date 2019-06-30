import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/database';

  const config = {
    apiKey: "AIzaSyA5pPMKxOZFENBMq0bPQD7hzxWI3h1VyV8",
    authDomain: "auctionapp-125.firebaseapp.com",
    databaseURL: "https://auctionapp-125.firebaseio.com",
    projectId: "auctionapp-125",
    storageBucket: "auctionapp-125.appspot.com",
    messagingSenderId: "197719090133"
  };
  firebase.initializeApp(config);

  export default firebase;