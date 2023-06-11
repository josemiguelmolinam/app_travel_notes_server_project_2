const selectUserByEmailQuery = require("../../db/queries/users/selectUserByEmailQuery");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateError } = require("../../helpers");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      generateError("Faltan campos", 400);
    }

    // Obtener el usuario por su email.
    const user = await selectUserByEmailQuery(email);
    
    // Verificar la contraseña.
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      generateError("Contraseña incorrecta", 401);
    }
     

    // Generar token de autenticación.
    const tokenInfo = {
      id: user.id,
    };
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "7d",
    });

    res.send({
      status: "Success",
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUser;
