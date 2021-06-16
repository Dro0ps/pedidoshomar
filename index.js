const express = require('express');
const conectarDB = require('./config/db');
const corsMiddleware = require('./middleware/cors/index');


const path = require('path');



// crear el servidor
const app = express();

app.options('*', corsMiddleware);
app.use(corsMiddleware);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

// Conectar a la base de datos
conectarDB();



// Habilitar express.json
app.use( express.json({ extended: true }));
/* app.use(express.urlencoded({ extended: true })); */




const port = process.env.PORT || 4000;


// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/tareas', require('./routes/tareas'));
app.use(express.static('uploads'));

/* // función middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'uploads')));
 */

// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
    
});

