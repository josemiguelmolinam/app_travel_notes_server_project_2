const getDB = require("../../getDB");
const {generateError}= require('../../../helpers');

const selectUserByIdQuery = async (userId) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT id,email, password, createdAt  FROM users WHERE id = ?`,
      [userId]
    );

    if (users.length < 1) {
      generateError("Usuario no encontrado", 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectUserByIdQuery;
