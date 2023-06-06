 const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const authUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if(!authorization) {
        generateError('Falta la cabecera de la autorización', 400);
    }

    let userInfo;

    try {

        userInfo = jwt.verify(authorization, process.env.SECRET);
        
    } catch {
        generateError('Token incorrecto', 401);
    }
      
      req.user = userInfo;

    next();

  } catch (err) {
    next(err);
  }
};

module.exports = authUser;
