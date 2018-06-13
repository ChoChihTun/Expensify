import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startLogin = () => {
  return () => {
    // Sign in with a pop up window
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};