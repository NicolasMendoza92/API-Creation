// Importación de módulos de versiones anteriores
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan');
// importamos las rutas que necesitamos.
const userRoute = require('./routes/usersRoute')
const memeRoutes = require('./routes/memesRoute');
const authRoutes = require('./routes/authRoute')


// Importante el orden de las funciones!!!

// crear el servidor
const app = express();

app.use(morgan('dev'));
// permitir acceso al serividor, para poder usarlo como una API y llamarlo de otra app react mia
app.use(cors());

// Conectar a mongodb
mongoose.connect(process.env.MONGO_URL);

// Habilitar express.json (tambien se puede usar body parser)
app.use(express.json({ extended: true }));

// Habilitar urlencoded, para consultas desde postman en este formato
app.use(express.urlencoded({ extended: true }));

//importar rutas
app.use('/api/users', userRoute)
app.use('/api/memes', memeRoutes);
app.use('/api/auth', authRoutes);

// puerto y arranque del servidor
app.listen(process.env.PORT || 4000, () => {
    console.log('Servidor Funcionando');
  })