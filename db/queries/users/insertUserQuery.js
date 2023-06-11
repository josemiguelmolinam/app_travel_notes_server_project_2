const getDB = require("../../getDB");
const bcrypt = require("bcrypt");
const { generateError } = require('../../../helpers');

const insertUserQuery = async (email, username, password) => {
  let connection;

  try {
    connection = await getDB();

    let [users] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (users.length > 0) {
      generateError("Ya existe un usuario con este email", 403);
    }

    [users] = await connection.query(
      `SELECT id FROM users WHERE username = ?`,
      [username]
    );
    if (users.length > 0) {
      generateError("Ya existe un usuario con este nombre", 403);
    }

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario.
    await connection.query(
      `INSERT INTO users (email, username, password, createdAt) VALUES (?,?,?,?)`,
      [email, username, hashedPass, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
