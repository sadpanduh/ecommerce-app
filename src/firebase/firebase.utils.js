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

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    //create data in the place if it doesnt exist
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error){
            console.log('error creating user', error.message);
        }
    }

    //always return userRef for some chance it might be used
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
