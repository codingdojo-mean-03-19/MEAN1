
function myFunc() {
  console.log('running func');
}
var myVar = 'this is a string';

myVar = 234234;

// console.log(myVar);

//            0,     1,
const array = ['dog', 'cat', 'horse'];

array.push(myVar);

// console.log(array[1] );

// console.log(index);

// var [dog, , cat] = array;
// var dog = array[0];
// var cat = array[1];
// console.log(dog, cat);

for (let index = 0; index < array.length; index++) {
  console.log('index is ' + index, array[index]);
}

// console.log('index after loop', index);


// for (var element in array) {
//   console.log('element is ' + array[element])
// }
// [[ 0, 'dog' ]]
// for (var [index, element] of array.entries()) {
//   console.log('element is ',  element, index)
// }


// var person = ['brown', 'blue', 5.6, 34];

const person = {
  hair: 'brown',
  eyes: 'blue',
  height: 5.6,
  age: 34,
  prop: 'this is prop'
};

person['weight'] = 178;



console.log(person);

// for (var prop in person) {
//   console.log('prop is ', prop, person[prop]);
// }

myFunc();



