require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const app = express();

app.use(express.json());

app.use(fileUpload());

app.use((req, res, next) => {
  console.log(`http://localhost:${process.env.PORT}/${req.path}`);
  next();
});

//Middleware que muestra informacion sobre la peticion entrante.
app.use(morgan('dev'));

/*#################################
  ###### middleware usuarios#######
  #################################*/
const authUser = require('./middlewares/authUser');

const getUser = require('./controllers/users/getUser');
const userExists = require('./middlewares/userExists');

const { newUser, loginUser } = require('./controllers/users');

// Registro de un usuario
app.post('/users', newUser);

// Login de usuario.
app.post('/users/login', loginUser);

app.get('/users/:userId', getUser);

// const schema = Joi.number().positive().integer();

// const validation = schema.validate(req.params.idUser);

// if (validation.error) {
//   console.error(validation.error.message);
// }

//obtener info del usuario del token

app.get('/users', authUser, getUser);

/*#################################
  ####### middleware notes#########
  #################################*/

const { newNote, listNotes } = require('./controllers/notes');
// nueva entrada
app.post('/notes', authUser, userExists, newNote);
// Lista de notas.
app.get('/notes', authUser, userExists, listNotes);
// Middleware de error.
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.httpStatus || 500).send({
    status: 'error',
    message: err.message,
  });
});
//Middleware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Ruta no encontrada',
  });
});
// ponemos el servi...
app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
