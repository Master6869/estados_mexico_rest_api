/**
 * Configuracion principal para el servidor
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Habilitar CORS (ajusta origin si tu página usa otro origen/puerto)
app.use(cors({ origin: 'http://localhost' })); // o { origin: '*' } temporalmente

// Opcional: cabeceras adicionales y manejo de preflight
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// Habilitar carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// configuracion global de rutas
app.use(require('./routes/index'));

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log('Escuchando puerto:', PORT);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Puerto ${PORT} en uso. Cambia PORT o cierra la otra instancia.`);
        process.exit(1);
    } else {
        console.error('Error en el servidor:', err);
        process.exit(1);
    }
});