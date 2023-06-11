const insertUserQuery = require("../../db/queries/users/insertUserQuery");
const { generateError } = require("../../helpers");

const newUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      generateError("Faltan campos", 400);
    }
    
    // Insertar el nuevo usuario en la base de datos.
    await insertUserQuery(email, username, password);
    res.send({
      status: "Success",
      message: "Usuario creado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newUser;
