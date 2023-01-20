require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {

  res.send('hallo! wie geht´s?');

});

app.listen(PORT, () => console.log('Server running on port:', PORT));