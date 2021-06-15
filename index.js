const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// habilitar cors
app.use(cors());

// Habilitar express.json
app.use( express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// puerto de la app
const port = process.env.port || 4000;



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