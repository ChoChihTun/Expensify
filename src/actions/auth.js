import { firebase, googleAuthProvider } from '../firebase/firebase';

export const logIn = (uid) => ({
  type: 'LOGIN',
  uid
});

// startLogin is similar to an action where we can dispatch it
export const startLogin = () => {
  return () => {
    // Sign in with a pop up window
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

// startLogout is similar to an action where we can dispatch it
export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};