function orderSupplies(item) {
  let warehouse; //undefined
  const deliveryTime = Math.random() * 3000;

  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      warehouse = {
        paint: {
          product: 'Neon Green Paint',
          directions: function() { return 'mix it!' }
        },
        brush: {
          product: 'Horsehair brush',
          directions: function() { return 'start painting!' }
        },
        tarp: {
          product: 'A large tarp',
          directions: () => 'cover the floor!'
        }
      };

      if (item in warehouse) {
        resolve(warehouse[item]);
      } else {
        reject(new Error(`'${item}' is out of stock`));
      }

    }, deliveryTime);
  });
}

function receivedItem(item) {
  console.log(`Received ${item.product}, time to ${item.directions()}`);
}

const handleError = error => console.log(error.message);

const paint = orderSupplies('paint');
const brush = orderSupplies('brush');
const tarp = orderSupplies('tarp');
const roller = orderSupplies('roller').catch(handleError)


Promise.all([tarp, paint, brush, roller])
  .then(items => {
    items.filter(v => v).forEach(receivedItem);
  })
  .catch(handleError)


// tarp
//   .then(receivedItem)
//   .then(() => paint)
//   .then(receivedItem)
//   .then(() => brush)
//   .then(receivedItem)
//   .catch(function (error) {
//     console.log(error.message);
//   })


// orderSupplies('paint', function (item) {
//   receivedItem(item);
//   orderSupplies('brush', receivedItem);
// });


// let havePaint = false;
// orderSupplies('paint', function (item) {
//   receivedItem(item);

//   havePaint = true;
// });

// orderSupplies('brush', handleBrush);

// function handleBrush(item) {
//   console.log('...checking for paint..', item);

//   if (havePaint) {
//     return receivedItem(item);
//   }


//   setTimeout(handleBrush, 50, item);
// }


// const products = ['paint', 'brush'];

// function order(items) {
//   const received = [];

//   for (let index = 0; index < items.length; index++) {
//     const item = items[index];

//     // console.log(`About to order ${item} at index ${index}`);

//     orderSupplies(item, function (product) {
//       received[index] = product;
//       // console.log(product, index);

//       // console.log(received);
//       if (received.filter(v => v).length === items.length) {
//         // print
//         received.forEach(receivedItem);
//       }
//     });

//   }

//   // console.log('loop complete');
// }

// order(products);


// const paint = new Promise(function (resolve, reject) {
//   orderSupplies('paint', resolve);
// });

// const brush = new Promise(function (resolve, reject) {
//   orderSupplies('brush', resolve);
// });

// const tarp = new Promise(function (resolve, reject) {
//   orderSupplies('tarp', resolve);
// });


// tarp
//   .then(receivedItem)
//   .then(() => paint)
//   .then(function (item) {
//     receivedItem(item);

//     return brush;
//   })
//   .then(function (item) {
//     receivedItem(item);
//   })
//   .catch(console.log);

