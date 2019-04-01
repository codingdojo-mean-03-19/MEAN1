const mongoose = require('mongoose');

const { Schema } = mongoose;
// const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/animals', { useNewUrlParser: true });

mongoose.connection.on('connected', () => console.log('Connected to MOngoDB'));


// const m = {
//   Schema: 'this is a schema',
//   Types: 'this is a type'
// };

// // const Schema = m.Schema;
// const { Types, Schema: schema } = m;

// console.log(Schema, Types, schema);

const AnimalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    minlength: [4, 'minlength is 4'],
    trim: true,
  },
  age: Number,
  legs: {
    type: Number,
    required: [true, 'I need more legs'],
    min: [0, 'not enough legs']
  },
  isPet: {
    type: Boolean,
    default: true,
  },
}, {
    timestamps: {
    updatedAt: 'updated_at'
  }
});

// Animal => animals collection
const Animal = mongoose.model('Animal', AnimalSchema);

const animal = new Animal({
  name: 'Bobo',
  age: 12,
  legs: 1,
});

// animal.save(function (error, savedAnimal) {
//   if (error) {
//     throw error;
//   }

//   console.log(savedAnimal);
// })


animal.save()
  .then(savedAnimal => {
    console.log(savedAnimal);
  })
  .catch(error => {


    // const keys = Object.keys(error.errors);
    const errors = Object.keys(error.errors).map(key => error.errors[key].message);


    // for (let index = 0; index < keys.length; index++) {
    //   console.log(index, keys[index]);
    //   errors.push(error.errors[keys[index]].message)
    // }

    console.log(errors);
  });
