require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const app = express();

const port = process.env.PORT;

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Servir contenido estatico
app.use(express.static('public'));

app.get('/', (req, res) => {

  // res.send('Hello jean, welcome to Home!');
  res.render('home', {
    nombre: 'Jean Rondón',
    usuario: 'jeandv',
    titulo: 'Curso de Node'
  });

});

app.get('/hola-mundo', (req, res) => {

  res.send('Hello jean y hola mundo!');

});

app.get('/generic', (req, res) => {

  // res.sendFile(__dirname + '/public/generic.html');
  res.render('generic', {
    nombre: 'Jean Rondón',
    usuario: 'jeandv',
    titulo: 'Curso de Node'
  });

});

app.get('/elements', (req, res) => {

  // res.sendFile(__dirname + '/public/elements.html');
  res.render('elements', {
    nombre: 'Jean Rondón',
    usuario: 'jeandv',
    titulo: 'Curso de Node'
  });

});

app.get('*', (req, res) => {

  // res.send('404 | Page not found');
  res.sendFile(__dirname + '/public/404.html');

});

app.listen(port);