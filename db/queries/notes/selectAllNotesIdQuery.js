const { generateError } = require('../../../helpers');
const getDB = require('../../getDB');

const selectAllNotesIdQuery = async (notesId, userId = 0) => {
  let connection;
  try {
    connection = await getDB();

    const [notes] = await connection.query(
      `
        SELECT
            N.id,
            N.title,
            N.text,
            N.image,
            N.categoryId,
            U.username,
            N.userId = ? AS owner,
            N.createdAt

            FROM notes N INNER JOIN users U ON U.id = N.userId
            WHERE N.id = ?
            

        `,
      [userId, notesId]
    );

    //si no hay entradas lanzamos error
    if (notes.length < 1) {
      generateError('Nota no encontrada', 400);
    }

    return notes[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllNotesIdQuery;
