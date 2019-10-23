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

//add a collection using existing data instead of adding in manually
//this should only be called once in componentdidmount to add initially and then removed from componentdidmount
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    //firestore can only make one set call at a time, you cant just set an array of documents
    //since each each call is individual its best to batch the requests to make sure the code gets to the database correctly
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        //get document at an empty string, tells firebase to get a new document ref and randomly generate an ID
        const newDocref = collectionRef.doc();
        batch.set(newDocref, obj);
    });

    //returns a promise, when succeeed it returns a void/null value
    return await batch.commit();
}

//grabs the collection data and formats it to an object with data we want
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
