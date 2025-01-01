import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth";


export const docreateUserWithEmailAndPassword = async (email,password) => {
    return createUserWithEmailAndPassword(auth , email , password);

};
export const doSignInWithEmailAndPassword =  (email,password) => {
    return signInWithEmailAndPassword(auth,email,password);
};

export const doSignwithGoogle = async () => {
    // return signInWithEmailAndPassword(auth,email,password);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth,provider);

    return result

};

export const doSignOut = () =>{
    return auth.signOut();
}



