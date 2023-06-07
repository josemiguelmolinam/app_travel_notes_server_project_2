require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

const app = express();

app.use(express.json());

app.use(fileUpload());

app.use((req, res, next) => {
  console.log(`http://localhost:${process.env.PORT}/${req.path}`);
  next();
});

//Middleware que muestra informacion sobre la peticion entrante.
app.use(morgan("dev"));

//importamos los middleware personalizado
const authUser = require("./middlewares/authUser");

const getUser = require("./controllers/users/getUser");
//const userExists = require("./middlewares/userExists");

const { newUser, loginUser } = require("./controllers/users");

// Registro de un usuario
app.post("/users", newUser);

// Login de usuario.
app.post("/users/login", loginUser);

//obtener info del usuario del token

app.get("/users", authUser, getUser);

//middleware notes
const { newNote } 
= require("./controllers/notes");
// nueva entrada
app.post("/notes", authUser, userExists, newNote);

// Obtener información del perfil de un usuario.
//app.get("/users/:userId", getUser);

// Funciones controladoras de las notas.
const { newNote } = require("./controllers/notes");

// Crear una nueva nota.
app.post("/notes", authUser, newNote);

// Middleware de error.
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.httpStatus || 500).send({
    status: "error",
    message: err.message,
  });
});
//Middleware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada",
  });
});
// ponemos el servi...
app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
