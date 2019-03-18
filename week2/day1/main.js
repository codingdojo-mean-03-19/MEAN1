

// // function addTwo(array) {
// //   const results = [];

// //   for (let index = 0; index < array.length; index++) {
// //     console.log('index is ', index, array[index]);
// //     const currentVal = array[index];
// //     const result = currentVal + 2;

// //     console.log('result', result);

// //     results.push(result);
// //   }


// //   return results;
// // }

// const vals = [345, 543, 98, 100];


// // function square(array) {
// //   const results = [];

// //   for (let index = 0; index < array.length; index++) {
// //     const currentVal = array[index];
// //     const result = currentVal * currentVal;
// //     results.push(result);
// //   }

// //   return results;
// // }


// function map(array, callback) {
//   const results = [];
//   // console.log(callback.toString());

//   for (let index = 0; index < array.length; index++) {
//     const currentVal = array[index];
//     // const result = currentVal * currentVal;
//     const result = callback(currentVal, index, array);
//     // console.log('result is ' + result);
//     results.push(result);
//   }

//   return results;
// }

// console.log('addtwo', map(vals, value => value + 2));



// const square = val => val * val;

// console.log('square', map(vals, square));
// console.log(map(vals, value => value + value))

// // function square(val) {
// //   return val * val;
// // }


// console.log('before');

// function sayHello(name) {
//   setTimeout(function () {
//     console.log(`Hello ${name}`);
//   }, 2000)
// }


// sayHello('Bob');

// console.log('after');



function getThingsFromDb(query, callback) {

  console.log(query);

  return setTimeout(function () {
    const data = ['thing1', 'thing2', 'thing3'];
    callback(data)
  }, 2000)

}


getThingsFromDb('select * from things;', function (things) {
  console.log('logging', things);

  things.forEach(thing => console.log(`I got ${thing}`));
});
