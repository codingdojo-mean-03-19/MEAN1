const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const port = process.env.PORT || 8000;
const app = express();
const logger = require('./server/middleware/logger')


console.log(logger);


const names = ['George', 'Sally', 'Jason'];


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.set('views', __dirname + './views');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

// app.use()

function whoops(request, response, next) {
  console.log(next);

  next(new Error('whoops'));
}



app.get('/', function (request, response) {
  // console.log(request);
  // console.log('got to index');

  // response.send('<h1>Hello from express</h1>');
  response.render('index');
})

app.post('/names', [whoops, whoops] , function (request, response) {
  console.log(request.body);

  names.push(request.body.name);

  console.log('posting content');

  response.render('results', { name: request.body.name, names: names });

  // response.redirect('/');
});

app.get('/names/:name_id', /**  [isLoggedIn, isAdmin], */ function (request, response) {
  console.log(request.params);
  response.send(names[request.params.name_id]);
});

app.use(function (error, request, response, next) {
  // console.log('recovering....')
  // logging error to db
  console.log(error.message);

  next(error);
})

app.use(function (error, request, response, next) {
  console.log('here')

  response.send(error.message);
})

app.listen(port, () => console.log(`Express server listening on port ${port}`));
