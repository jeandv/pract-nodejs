import * as dotenv from 'dotenv';
dotenv.config();

import colors from 'colors';
import {
  inquirerMenu,
  leerInput,
  listarLugares,
  pausa
} from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';

const main = async () => {

  const { ciudad, climaLugar, agregarHistorial, historial } = new Busquedas();
  let opt;

  console.clear();

  do {
    opt = await inquirerMenu();
    // console.log(opt);

    switch (opt) {

      case 1:
        // Mostrar mensaje
        const terminoBusqueda = await leerInput('Ciudad: ');

        // Buscar los lugares
        const lugares = await ciudad(terminoBusqueda);

        // Seleccionar lugares
        const idLugarSeleccionado = await listarLugares(lugares);
        if (idLugarSeleccionado === '0') continue;

        // el find significa: si el id del lugar seleccionado de la lista es igual a algunos de los id de los lugares que guarde la info en la constante desestructurandolo
        const { nombre, lng, lat } = lugares.find(lugar => lugar.id === idLugarSeleccionado);

        // guardo en "DB" la ciudad buscada/seleccionada
        agregarHistorial(nombre);

        // Datos del clima y destructuración
        const { desc, min, max, temp } = await climaLugar(lng, lat);

        // Mostrar resultados
        console.log('\nInformación del clima de la ciudad:\n'.cyan);
        console.log('Ciudad:', nombre);
        console.log('Descripción:', desc);
        console.log('Lat:', lat);
        console.log('Lon:', lng);
        console.log('Temperatura:', temp);
        console.log('Temp. Mínima:', min);
        console.log('Temp. Máxima:', max);

        break;

      case 2:
        historial.forEach((lugar, i) => {

          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);

        });

        break;
    }

    if (opt !== 0) await pausa();

  } while (opt !== 0);

}

main();