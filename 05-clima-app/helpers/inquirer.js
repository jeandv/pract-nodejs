import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.cyan} Buscar ciudad 🌎`
            },
            {
                value: 2,
                name: `${'2.'.cyan} Historial 🔎`
            },
            {
                value: 0,
                name: `${'0.'.cyan} Salir ❌`
            },
        ]
    }
];

const inquirerMenu = async () => {

    console.clear();
    console.log('========================'.green);
    console.log(' Seleccione una opción'.white);
    console.log('========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;

}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);

}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0)
                    return 'Por favor ingrese un valor';

                return true
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;

}

const listarLugares = async (lugares = []) => {

    const choices = lugares.map((lugar, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }

    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar y volver'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: '¿Qué tarea desea borrar?',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);

    return id;
}

const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tareas.completadoEn) ? true : false
        }

    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(preguntas);

    return ids;
}

const confirmarBorrado = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;

}

export {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmarBorrado,
    mostrarListadoChecklist
}