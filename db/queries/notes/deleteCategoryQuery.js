const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');

const deleteCategoryQuery = async (categoryId) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query('DELETE FROM categories WHERE id = ?', [categoryId]);
  } catch (error) {
    throw generateError('Error al eliminar la categoría', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteCategoryQuery;
