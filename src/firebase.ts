import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAgCnzNViJxhs_Il1FeyIRjNVZkAyxm99Y",
    authDomain: "test-2bc41.firebaseapp.com",
    projectId: "test-2bc41",
    storageBucket: "test-2bc41.appspot.com",
    messagingSenderId: "82990205406",
    appId: "1:82990205406:web:c21f13dcc31c74e09a354f",
};

// Initialization
firebase.initializeApp(firebaseConfig);
export const message = firebase.messaging();

// eslint-disable-next-line no-console
message.onMessage(console.log);

export default firebase;

