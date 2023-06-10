const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');

const getAllCategoriesQuery = async () => {
  let connection;

  try {
    connection = await getDB();


    const [categories] = await connection.query('SELECT * FROM categories');

    return categories;
  } catch (error) {
    throw generateError('Error al obtener las categorías', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getAllCategoriesQuery;