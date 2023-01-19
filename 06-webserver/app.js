const express = require('express');
const app = express();

app.get('/', (req, res) => {

  res.send('Hello jean, welcome to Home!');

});

app.get('/hola-mundo', (req, res) => {

  res.send('Hello jean y hola mundo!');

});

app.get('*', (req, res) => {

  res.send('404 | Page not found');

});

app.listen(8080);