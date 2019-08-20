import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAahU4B0ua0YZjCm0rfKsZL1YVm4z9pnu8",
    authDomain: "ecommerce-db-ad329.firebaseapp.com",
    databaseURL: "https://ecommerce-db-ad329.firebaseio.com",
    projectId: "ecommerce-db-ad329",
    storageBucket: "",
    messagingSenderId: "444262863712",
    appId: "1:444262863712:web:45bc5b58909b3f98"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
