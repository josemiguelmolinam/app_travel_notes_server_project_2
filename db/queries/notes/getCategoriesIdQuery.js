const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');

const getCategoriesIdQuery = async (categoryId, userId = 0) => {
  let connection;
  try {
    connection = await getDB();

    const [categories] = await connection.query(
      `
      SELECT
        *
      FROM
        categories
      
      `,
      [userId, categoryId]
    );

    // Si no hay notas, lanzamos un error.
    if (categories.length < 1) {
      throw generateError('Nota no encontrada', 404);
    }

    // Dado que no puede existir más de una nota de un tweet con el mismo ID, en caso de que en el array.
    // de notas haya una nota, estará en la posición 0.
    return categories[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getCategoriesIdQuery;
