const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");


// Inicializar app
console.log("App node arrancada");

// Conectar a la base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());

// Convertir Body a objeto JS
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})); // form-urlencoded

//RUTAS
const rutas_articulo = require("./rutas/articulo");

//Cargo las rutas
app.use("/api", rutas_articulo);


// rutas de pruebas harcodeadas
app.get("/probando", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).json(
        [
            {
                curso: "Master en ReactJS",
                autor: "Victor Robles",
                url: "https://jeandv.vercel.app"
            },
            {
                curso: "Master en NodeJS",
                autor: "Jean Rondon",
                url: "https://jeandv.vercel.app"
            }
        ],

    );
});

app.get("/", (req, res) => {
    console.log("Se ha ejecutado el endpoint principal");

    return res.status(200).send(`
    <div>
        <h1>Probando ruta nodejs</h1>
        <p>Creando api rest con node</p>
    </div>
    `);
});

// Crear servidor  y escuchar petiicones http
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
});