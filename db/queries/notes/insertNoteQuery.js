const getDB = require('../../getDB');

const insertNoteQuery = async (title, text, categoryId, imgName, userId) => {
  let connection;

  try {
    connection = await getDB();

    const createdAt = new Date();

    const [note] = await connection.query(
      `INSERT INTO notes(title, text,image, categoryId, userId, createdAt) VALUES(?, ?, ?, ?, ?, ?)`,
      [title, text, imgName, categoryId, userId, createdAt]
    );

    return {
      id: note.insertId,
      title,
      text,
      image: imgName,
      categoryId,
      userId,
      createdAt,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertNoteQuery;
