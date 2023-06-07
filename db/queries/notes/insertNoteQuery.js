const getDB = require("../../getDB");

const insertNoteQuery = async (title, text, userId) => {
  let connection;

  try {
    connection = await getDB();

    const createdAt = new Date();

    const [entry] = await connection.query(
      `INSERT INTO entries(title, text, userId, createdAt) VALUES(?, ?, ?, ?)`,
      [title, text, userId, createdAt]
    );

    return {
      id: entry.insertId,
      title,
      text,
      userId,
      createdAt,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertNoteQuery;
