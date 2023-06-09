const getDB = require('../../getDB');

const selectAllNotesQuery = async (keyword = '', userId = 0) => {
  let connection;
  try {
    connection = await getDB();

    const [notes] = await connection.query(
      `
        SELECT
            N.id,
            N.title,
            N.text,
            N.categoryId,
            U.username,
            NuserId = ? AS owner,
            N.createdAt

            FROM notes N INNER JOIN users U ON U.id= E.userId
            WHERE E.title LIKE ? OR E.text LIKE ? OR E.categoryId LIKE ?
            ORDER BY E.createdAt DESC

        `,
      [userId, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );

    return notes;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllNotesQuery;
