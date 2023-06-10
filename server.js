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

// Middleware que muestra informacion sobre la peticion entrante.
app.use(morgan('dev'));

/*#################################
  ###### Middleware usuarios#######
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
  ####### Middleware notes#########
  #################################*/

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
} = require('./controllers/notes');

// nueva entrada
app.post('/notes', authUser, userExists, newNote);

// Lista de notas.
app.get('/notes', authUser, userExists, listNotes);

//obtenemos info de una nota concreta
app.get('/notes/:noteId', authUser, userExists, getNotes);

// Eliminamos una nota.(estamos probando si va bien si es notes o note)
app.delete('/notes/:noteId/', authUser, userExists, deleteNote);

//editar notas
app.put('/notes', authUser, userExists, editNote);

// Crear una nueva categoría
app.post('/notes/categories', authUser, userExists, createCategory);

// Editar una categoría existente
app.put('/notes/categories/:categoryId', authUser, 
userExists, editCategory);

// Eliminar una categoría existente
app.delete('/notes/categories/:categoryId', authUser, userExists, deleteCategory);

// Obtener todas las categorías
app.get('/notes/categories', authUser, getAllCategories);


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
// ponemos el servi...
app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});

//exports.dashboardUpdateNote = async (req, res) => {
  //try {
    //await Note.findOneAndUpdate(
      //{ _id: req.params.id },
      //{ title: req.body.title, body: req.body.body }
    //).where({ user: req.user.id });
    //res.redirect('/dashboard');
  //} catch (error) {
    //console.log(error);
  //}
//};
