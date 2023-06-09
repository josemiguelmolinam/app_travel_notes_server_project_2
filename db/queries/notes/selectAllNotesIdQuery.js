const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');

const selectAllNotesIdQuery = async (noteId, userId = 0) => {
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
      [userId, noteId]
    );

    //si no hay notas lanzamos error
    if (notes.length < 1) {
      throw generateError('Nota no encontrada', 404);
    }

    //dado que no puede existir mas de una nota de un tweet con el mismo id, en caso de que en el array
    //de notas haya una nota estara en la posicion 0
    return notes[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllNotesIdQuery;
