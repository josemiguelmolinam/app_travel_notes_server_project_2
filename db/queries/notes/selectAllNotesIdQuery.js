const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');

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
        N.userId,
        N.createdAt
      FROM
        notes N
      INNER JOIN
        users U
      ON
        U.id = N.userId
      WHERE
        N.id = ?;
      `,
      [userId, notesId]
    );

    // If no notes are found, throw an error
    if (notes.length < 1) {
      throw generateError('Nota no encontrada', 404);
    }

    // Since there should be only one note with a given ID, it will be at position 0 in the notes array
    return notes[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllNotesIdQuery;
