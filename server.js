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

app.use(morgan('dev'));

/*#################################
  ###### middleware usuarios#######
  #################################*/
const authUser = require('./middlewares/authUser');
const userExists = require('./middlewares/userExists');

const { newUser, loginUser, getUser } = require('./controllers/users');

// Registro de un usuario
app.post('/users', newUser);

// Login de usuario.
app.post('/users/login', loginUser);

// Obtener información de un usuario por ID
app.get('/users/:userId', getUser);

// Obtener información del usuario del token
app.get('/users', authUser, getUser);

/*#################################
  ####### middleware notes#########
  #################################*/

const {
  newNote,
  listNotes,
  getNotes,
  editNote,
} = require('./controllers/notes');

// Nueva entrada
app.post('/notes', authUser, userExists, newNote);

// Lista de notas.
app.get('/notes', authUser, userExists, listNotes);

// Obtener información de una nota concreta
app.get('/notes/:noteId', authUser, userExists, getNotes);

// Editar una nota
app.put('/notes/:noteId', authUser, userExists, editNote);

/*#################################
  ####### middleware error#########
  #################################*/
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.httpStatus || 500).send({
    status: 'error',
    message: err.message,
  });
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
