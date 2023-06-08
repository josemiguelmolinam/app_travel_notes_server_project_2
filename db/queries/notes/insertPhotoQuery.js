const getDB = require('../../getDB');

const insertPhotoQuery = async (photo, noteId) => {
  let connection;
  try {
    connection = await getDB();
    const createdAt = new Date();
    const [photo] = await connection.query(
      `INSERT INTO notesPhotos(name, entryId, createdAt) VALUES (?,?,?)`,
      [photo, noteId, createdAt]
    );

    return {
      id: photo.insertId,
      name: photo,
      noteId,
      createdAt,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPhotoQuery;
