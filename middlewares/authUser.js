const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");

const authUser = async (req, res, next) => {
  try {
    // Verificar si se proporciona la cabecera de autorización.
    const { authorization } = req.headers;

    if (!authorization) {
      generateError("Falta la cabecera de la autorización", 400);
    }

    let userInfo;

    try {

      // Verificar y decodificar el token de autorización.
      userInfo = jwt.verify(authorization, process.env.SECRET);
    } catch {
      generateError("Token incorrecto", 401);
    }
    
    // Guardar la información del usuario en el objeto de solicitud.
    req.user = userInfo;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authUser;
