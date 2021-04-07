import firebase from "firebase/app";
import "firebase/messaging";

export const isSupported = firebase.messaging.isSupported();

if (isSupported) {
    const firebaseConfig = {
        apiKey: "AIzaSyCda3WcMdN1O449MNgcAC4mNaWsYN_Knz4",
        authDomain: "tabool-37070.firebaseapp.com",
        projectId: "tabool-37070",
        storageBucket: "tabool-37070.appspot.com",
        messagingSenderId: "717458722533",
        appId: "1:717458722533:web:bc3aec819bfeccb1740e0c",
        measurementId: "G-1R4MVQ4MN1",
    };

    firebase.initializeApp(firebaseConfig);
}

export default firebase;

