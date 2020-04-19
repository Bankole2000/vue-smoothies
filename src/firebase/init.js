import firebase from 'firebase';
/* eslint-disable-next-line */
import firestore from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBlaNjtGDNU34cFGqb-4HQH101SOm6P5ec',
  authDomain: 'smoothies-a3bd6.firebaseapp.com',
  databaseURL: 'https://smoothies-a3bd6.firebaseio.com',
  projectId: 'smoothies-a3bd6',
  storageBucket: 'smoothies-a3bd6.appspot.com',
  messagingSenderId: '736721758010',
  appId: '1:736721758010:web:8989f2114ac8d8b15d9203',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true });

// export firestore database
export default firebaseApp.firestore();
