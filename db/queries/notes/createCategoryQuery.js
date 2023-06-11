const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');

const createCategoryQuery = async (name) => {
  let connection;

  try {
    connection = await getDB();


    // Insertar una nueva categoría en la base de datos.
    await connection.query('INSERT INTO categories (name) VALUES (?)', [name]);
  } catch (error) {
    throw generateError('Error al crear la categoría', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = createCategoryQuery;