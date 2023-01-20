const express = require('express');
const cors = require('cors');

class Server {

  constructor() {

    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

  }

  middlewares() {

    // CORS
    this.app.use(cors());

    // Directorio publico
    this.app.use(express.static('public'));

  }

  routes() {

    this.app.get('/api', (req, res) => {

      res.json({
        msg: 'get Api'
      });

    });

    this.app.put('/api', (req, res) => {

      res.json({
        msg: 'put Api'
      });

    });

    this.app.post('/api', (req, res) => {

      res.json({
        msg: 'post Api'
      });

    });

    this.app.delete('/api', (req, res) => {

      res.json({
        msg: 'delete Api'
      });

    });

    this.app.patch('/api', (req, res) => {

      res.json({
        msg: 'patch Api'
      });

    });

  }

  listen() {

    this.app.listen(this.port, () => console.log('Server running on port:', this.port));

  }

}

module.exports = Server;