//======================
// Object Destructuring
//======================
const person = {
  name: 'Chih Tun',
  age: 23,
  location: {
    city: 'Singapore',
    temp: 31
  }
};

const { name = 'default', age } = person;
/* Same as:
const name = person.name;
const age = person.age;

NOTE: Only use the default value when there is no value in the object or object has no such property
 */

console.log(`${name} is ${age}`);

const { city, temp: temperature } = person.location;
/* Same as:
const city = person.location.city;
const temp = person.location.temp;

NOTE: 
* const { city, temp } = person; --> city and temp are undefined. Can only destructure object and not nested objects

* To destructure and rename the variable, use temp: newName. After which, temp will be undefined.
 */

console.log(`${city} is ${temperature} degree`);

const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguin'
  }
};

const { name: publisherName = 'Self-Published'} = book.publisher;
console.log(publisherName);

//======================
// Array Destructuring
//======================
const address = ['blk473D', 'Upper Serangoon Crescent', '538473'];