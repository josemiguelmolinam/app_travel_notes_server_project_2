const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');

const editCategoryQuery = async (categoryId, newName) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query('UPDATE categories SET name = ? WHERE id = ?', [newName, categoryId]);
  } catch (error) {
    throw generateError('Error al editar la categoría', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editCategoryQuery;
