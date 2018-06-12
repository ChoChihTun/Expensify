// Import ALL the named export into firebase. Access named export with firebase.METHOD
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDNiySl5cG1SYE4i2P2itJW1lh9H3VbS-4",
  authDomain: "expensify-1bf6d.firebaseapp.com",
  databaseURL: "https://expensify-1bf6d.firebaseio.com",
  projectId: "expensify-1bf6d",
  storageBucket: "expensify-1bf6d.appspot.com",
  messagingSenderId: "529777249150"
};

// Initialise firebase to work with
firebase.initializeApp(config);

const database = firebase.database();

// ref() --> No argument means referencing to root of database
database.ref().set({
  name: 'Cho Chih Tun',
  age: 26,
  isSingle: false,
  location: {
    City: 'Singapore',
  }
});

/* // This will overwrite the data set previously at root database
database.ref().set('This is my data'); */

database.ref('age').set(23);

// Access the specific part of the database
database.ref('location/City').set('Taiwan');

// Adding additional property without overwriting the existing data
database.ref('attributes').set({
    height: 172,
    weight: 72
});