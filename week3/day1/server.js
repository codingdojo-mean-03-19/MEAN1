const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const port = process.env.PORT || 8000;
const app = express();

const names = ['George', 'Sally', 'Jason'];


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.set('views', __dirname + './views');


app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (request, response) {
  console.log(request);
  console.log('got to index');

  // response.send('<h1>Hello from express</h1>');
  response.render('index');
})

app.post('/names', function (request, response) {
  console.log(request.body);

  names.push(request.body.name);

  console.log('posting content');

  // response.render('results', { name: request.body.name, names: names });

  response.redirect('/');
});

app.get('/names/:name_id', function (request, response) {
  console.log(request.params);
  response.send(names[request.params.name_id]);
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));
