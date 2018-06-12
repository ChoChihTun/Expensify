const promise = new Promise((resolve, reject) => {
  // Can only resovle or reject but not both
  // Only 1 argument
  setTimeout(() => {
    // resolve('This is my resolved data');
    reject('Something went wrong');
  }, 5000);
});
console.log('before');

// Initiated/Called but we do not wait for this to finish running. Simply move on to next statement
promise.then((data) => {
  console.log("1". data);
}).catch((error) => { // To catch the error, like try catch
  console.log("Error: ", error);
});

console.log('after');