const fs = require('fs');

const crearArchivo = async (base = 5, listar = false, hasta = 10) => {

    try {

        let salida = '';

        for (let i = 1; i <= hasta; i++)
            salida += `${base} x ${i} = ${base * i}\n`;

        if (listar) {
            console.log(`Tabla del ${base}:`);
            console.log(salida);
        }

        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

        return `tabla-${base}.txt`;

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    crearArchivo
}