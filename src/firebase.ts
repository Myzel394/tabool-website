import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCda3WcMdN1O449MNgcAC4mNaWsYN_Knz4",
    authDomain: "tabool-37070.firebaseapp.com",
    projectId: "tabool-37070",
    storageBucket: "tabool-37070.appspot.com",
    messagingSenderId: "717458722533",
    appId: "1:717458722533:web:bc3aec819bfeccb1740e0c",
    measurementId: "G-1R4MVQ4MN1",
};

// Initialization
firebase.initializeApp(firebaseConfig);
export const message = firebase.messaging();
export const analytics = firebase.analytics();

export default firebase;

