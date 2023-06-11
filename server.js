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

// Middleware que muestra información sobre la petición entrante.
app.use(morgan('dev'));


/*#################################
  ###### Middleware usuarios#######
  #################################*/

// Middleware para autenticar al usuario.
const authUser = require('./middlewares/authUser');

// Controlador para obtener información de un usuario
const getUser = require('./controllers/users/getUser');

// Middleware para verificar si el usuario existe.
const userExists = require('./middlewares/userExists');

// Controladores para registro y login de usuario.
const { newUser, loginUser } = require('./controllers/users');

// Registro de un usuario.
app.post('/users', newUser);

// Login de usuario.
app.post('/users/login', loginUser);

// Obtener información de un usuario por su ID.
app.get('/users/:userId', getUser);

// Obtener información del usuario del token.
app.get('/users', authUser, getUser);

// const schema = Joi.number().positive().integer();

// const validation = schema.validate(req.params.idUser);

// if (validation.error) {
//   console.error(validation.error.message);
// }

//obtener info del usuario del token



/*#################################
  ####### Middleware notes#########
  #################################*/

// Controladores para las notas.

const {
  newNote,
  listNotes,
  getNotes,
  editNote,
  deleteNote,
  createCategory,
  editCategory,
  deleteCategory,
  getAllCategories,
  updateNotePrivacy,
} = require('./controllers/notes');

// Crear una nueva nota.
app.post('/notes', authUser, userExists, newNote);

// Obtener el listado de notas del usuario.
app.get('/notes', authUser, userExists, listNotes);

// Obtener información de una nota específica.
app.get('/notes/:noteId', authUser, userExists, getNotes);

// Eliminar una nota.
app.delete('/notes/:noteId/', authUser, userExists, deleteNote);

// Editar una nota existente.
app.put('/notes', authUser, userExists, editNote);

// Crear una nueva categoría.
app.post('/notes/categories', authUser, userExists, createCategory);

// Editar una categoría existente.
app.put('/notes/categories/:categoryId', authUser, 
userExists, editCategory);

// Eliminar una categoría existente.
app.delete('/notes/categories/:categoryId', authUser, userExists, deleteCategory);

// Obtener todas las categorías.
app.get('/notes/categories', authUser, getAllCategories);

// Modificar la privacidad de una nota.
app.put('/notes/:noteId/public', authUser, userExists, updateNotePrivacy);


/*#################################
  ####### Middleware error#########
  #################################*/
  
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
// Iniciamos el servidor.
app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
