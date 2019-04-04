const parser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

// const port = process.env.PORT || 8000;
const { PORT: port = 8000 } = process.env;
const { Schema } = mongoose
const app = express();


mongoose.connect('mongodb://localhost/books_and_authors', { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('connected to mongodb'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(parser.urlencoded({ extended: true }));

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Supply an author name'],
    trim: true,
  },
  age: Number,
  isAlive: {
    type: Boolean,
    default: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
});

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  pages: {
    type: Number,
    required: true,
    min: 1
  },
  year: Number,
  publisher: String,
})

const Author = mongoose.model('Author', AuthorSchema);
const Book = mongoose.model('Book', BookSchema);

app.get('/', function (request, response) {
  response.render('index');
});
app.get('/authors', function (request, response) {
  Author.find({})
    .populate('books')
    .then(authors => response.render('authors/index', { authors }))
})
app.get('/authors/new', function (request, response) {
  response.render('authors/new');
})
app.post('/authors', function (request, response) {
  console.log(request.body);

  Author.create(request.body)
    .then(author => {
      console.log(author)
      response.redirect('/authors');
    })
    .catch(error => {
      const errors = Object.keys(error.errors).map(key => error.errors[key].message);


      response.render('authors/new', { errors });
    });
})
app.get('/books', function (request, response) {
  Book.find({})
    .populate('author')
    .then(books => response.render('books/index', { books }));

});
app.get('/books/new', function (request, response) {
  Author.find({})
    .then(authors => response.render('books/new', { authors }))
})
app.post('/books', function (request, response) {
  Book.create(request.body)
    .then(book => {
      console.log(book)

      return Author.findById(book.author)
        .then(author => {
          author.books.push(book._id);

          return author.save();
        })
        .then(() => {
          response.redirect('/books')
        });
    })
    .catch(error => {
      const errors = Object.keys(error.errors).map(key => error.errors[key].message);


      response.render('authors/new', { errors });
    });
});

app.listen(port, () => console.log(`express server listening on port ${port}`));

