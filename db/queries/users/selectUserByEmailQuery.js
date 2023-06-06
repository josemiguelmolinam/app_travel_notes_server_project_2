const getDB = require("../../getDB");

const selectUserByEmailQuery = async (email) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT id, password  FROM users WHERE email = ?`, // se retirò el rol
      [email]
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
