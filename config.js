import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCLKlCJxux6_lcKK-v7rWfQqBnai11pHUU",
    authDomain: "firestoreadv.firebaseapp.com",
    projectId: "firestoreadv",
    storageBucket: "firestoreadv.appspot.com",
    messagingSenderId: "253486559558",
    appId: "1:253486559558:web:67d324272232be540c7547",
    measurementId: "G-JQH6S8F1JV"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export { firebase };
