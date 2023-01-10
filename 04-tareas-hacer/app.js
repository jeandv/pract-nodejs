require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmarBorrado,
    mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) tareas.cargarTareasFromArray(tareasDB);

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const descripcion = await leerInput('Descripción:');
                tareas.crearTarea(descripcion);

                break;

            case '2':
                tareas.listadoCompleto();

                break;

            case '3':
                tareas.listarPendientesCompletadas();

                break;

            case '4':
                tareas.listarPendientesCompletadas(false);

                break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);

                break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if (id !== '0') {

                    const confirmar = await confirmarBorrado('¿Está Seguro?');

                    if (confirmar) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente')
                    }

                }

                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}

main();