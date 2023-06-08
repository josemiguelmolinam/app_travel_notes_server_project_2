const getDB = require('../../getDB');

const insertNoteQuery = async (title, text, categoryId, userId) => {
  let connection;

  try {
    connection = await getDB();

    const createdAt = new Date();

    const [entry] = await connection.query(
      `INSERT INTO notes(title, text, categoryId, userId, createdAt) VALUES(?, ?, ?, ?, ?)`,
      [title, text, categoryId, userId, createdAt]
    );

    return {
      id: entry.insertId,
      title,
      text,
      categoryId,
      userId,
      createdAt,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertNoteQuery;
