const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();



// Habilitar express.json
app.use( express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// hABILITAR cORS
const whitelist = ['http://localhost:3000'];
/* const whitelist = [process.env.FRONTEND_URL]; */
const corsOptions={
    /* origin: (origin, callback) => {
        console.log('origin');
        // Revisar si la petición viene de un servidor que esta en la lista blanca
        const existe = whitelist.some( dominio => dominio === origin);
        if(existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por Cors'))
        }

    } */

    origin: process.env.FRONTEND_URL,
    methods: "GET, PUT, POST, DELETE, OPTIONS"
}

// habilitar cors
/* app.use(cors(corsOptions)); */
app.use(cors(corsOptions));

// puerto de la app
/* const port = process.env.REACT_APP_BACKEND_URL; */
const port = process.env.REACT_APP_BACKEND_URL || 4000;


// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/tareas', require('./routes/tareas'));
app.use(express.static('uploads'));

// función middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'uploads')));

// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});