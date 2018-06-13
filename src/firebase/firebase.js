// Import ALL the named export into firebase. Access named export with firebase.METHOD
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

// Initialise firebase to work with
firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

/* database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
}); */

/* database.ref('expenses')
  .on('value', (snapshot) => {
    const expenses = [];

    snapshot.forEach((childSnapshot) => {
      expenses.push({
        id: childSnapshot.key, //The unique id
        ...childSnapshot.val() //Spread operator
      });
    });
    console.log(expenses);
  }); */


/* 
database.ref('expenses').push({
  description: 'Rent',
  note: 'Pay ASAP',
  amount: 75000,
  createdAt: 1000
}); */

/* database.ref('expenses').push({
  description: 'Bill',
  note: 'Pay tmr',
  amount: 13000,
  createdAt: -1000
});

database.ref('expenses').push({
  description: 'Water',
  note: '',
  amount: 1985412,
  createdAt: 0
}); */

/* 
database.ref('notes').push({
  title: 'Second note',
  body: 'This is my note yay'
}); */

/* const firebaseNotes = {
  notes: {
    id1: {
      title: 'First note',
      body: 'This is my note'
    },
    id2: {
      title: 'Another note',
      body: 'This is my note'
    }
  }
}

const notes = [{
  id: '12',
  title: 'First note',
  body: 'This is my note'
}, {
  id: '23dfs',
  title: 'Another note',
  body: 'This is my note'
}];
 */

/* const onValueChange = database.ref().on('value', (snapshot) => {
  const val = snapshot.val();
  console.log(`${val.name} is a ${val.job.title}`);
}, (e) => {
  console.log('Error in fetching the data.', e);
});

setTimeout(() => {
  database.ref('job/title').set('undergraduate');  
}, 3000);
 */

/* database.ref()
  .once('value')
  .then((snapshot) => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch((e) => {
    console.log('Error in fetching data.', e);
  });
 */
/* // ref() --> No argument means referencing to root of database */
/* database.ref().set({
  name: 'Cho Chih Tun',
  age: 26,
  stressLevel: 9,
  job: {
    title: 'Student',
    company: 'NUS'
  },
  isSingle: false,
  location: {
    City: 'Singapore',
    Location: 'Singapore'
  }
}).then(() => {
  console.log('Data is saved');
}).catch((error) => {
  console.log('This failed. ', error);
}); */
/*
database.ref().update({
  stressLevel: 9,
  'job/company': 'Amazon',
  'location/City': 'Seattle'
}); */

/* // This will overwrite the data set previously at root database
database.ref().set('This is my data');

database.ref('age').set(23);

// Access the specific part of the database
database.ref('location/City').set('Taiwan');

// Adding additional property without overwriting the existing data
database.ref('attributes').set({
    height: 172,
    weight: 72
}).then(() => {
  console.log('Attributes are saved');
}).catch((error) => {
  console.log('This failed. ', error);
});

// Removing a data from the database.
// We cannot remove simply by deleting the code. Need remove explicitly
database.ref('isSingle').remove().then(() => {
  console.log('Data is removed');
}).catch((e) => {
  console.log('This failed.', e);
})

database.ref('isSingle').set(null); */