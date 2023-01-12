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

  const { ciudad, historial } = new Busquedas();
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
        const lugarSeleccionado = lugares.find(lugar => lugar.id === idLugarSeleccionado);

        // Datos del clima

        // Mostrar resultados
        console.log('\nInformación de la ciudad\n'.cyan);
        console.log('Ciudad:', lugarSeleccionado.nombre);
        console.log('Lat:', lugarSeleccionado.lng);
        console.log('Lng:', lugarSeleccionado.lat);
        console.log('Temperatura:',);
        console.log('Mínima:',);
        console.log('Máxima:',);

        break;

      // case 2:
      //   console.log('Viendo historial')

      //   break;
    }

    if (opt !== 0) await pausa();

  } while (opt !== 0);

}

main();