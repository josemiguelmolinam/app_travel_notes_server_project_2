require('dotenv').config();

const { log } = require('console');
const exp = require('constants');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`http://localhost:${process.env.PORT}/${req.path}`);
  next();
});

//Middleware que muestra informacion sobre la peticion entrante.
app.use(morgan('dev'));

//Middleware de usuarios

const authUser = require('./middlewares/authUser');
const userExists = require('./middlewares/userExists');

const {
  newUser,
  validateUser,
  loginUser,
  getUser,
  getOwnUser,
} = require('./controllers/users');

//Registro de un usuario
app.post('/users', newUser);

//Middleware de error
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.httpStatus || 500).send({
    status: 'error',
    message: err.message,
  });

  // Registro de usuario
  app.post('/users', newUser);

  // Login de usuario.
  app.post('/users/login', loginUser);

  // Obtener información del perfil de un usuario.
  app.get('/users/:userId', getUser);

  // Middleware de error.
  app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
      status: 'error',
      message: err.message,
    });
  });

  //Ruta no encontrada
});
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Ruta no encontrada',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
