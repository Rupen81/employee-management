// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDBTob8KMmyofUh-hS7uunDP-KL6ehWvGI",
    authDomain: "rdx-1st.firebaseapp.com",
    projectId: "rdx-1st",
    storageBucket: "rdx-1st.appspot.com",
    messagingSenderId: "191948701365",
    appId: "1:191948701365:web:d0ed94efa5c06f730388fc",
    measurementId: "G-WLRCNRN6T8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const signInWithGoogle = async () => {
    return await signInWithPopup(auth, provider);
}
const analytics = getAnalytics(app);