const getDB = require("../../getDB");
const { generateError } = require('../../../helpers');

// Consulta para seleccionar un usuario por su email.
const selectUserByEmailQuery = async (email) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT id, password  FROM users WHERE email = ?`,
    );

    if (users.length < 1) {
      generateError("Usuario no encontrado", 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectUserByEmailQuery;
