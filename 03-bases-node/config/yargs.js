const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Es la base de la tabla de multiplicar'
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        demandOption: false,
        default: false,
        describe: 'Muestra la tabla de multiplicar en consola'
    }).option('h', {
        alias: 'hasta',
        type: 'number',
        demandOption: false,
        default: 10,
        describe: 'Elige hasta cual número multiplicar'
    })
    .check((argv, options) => {
        if (isNaN(argv.b) || isNaN(argv.h))
            throw 'Tiene que ser un número';

        return true;
    })
    .argv;

module.exports = argv;