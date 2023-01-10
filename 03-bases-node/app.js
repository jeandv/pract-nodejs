const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');

console.clear();

crearArchivo(argv.base, argv.listar, argv.hasta)
    .then(nombreArchivo => console.log(`${nombreArchivo} creado`))
    .catch(err => err);