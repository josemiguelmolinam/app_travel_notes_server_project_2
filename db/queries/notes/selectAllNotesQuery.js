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
            N.userId = ? AS owner,
            N.createdAt

            FROM notes N INNER JOIN users U ON U.id = N.userId
            WHERE N.title LIKE ? OR N.text LIKE ? 
            OR N. categoryId LIKE ?
            ORDER BY N.createdAt DESC

        `,
      [userId, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );

    return notes;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllNotesQuery;
