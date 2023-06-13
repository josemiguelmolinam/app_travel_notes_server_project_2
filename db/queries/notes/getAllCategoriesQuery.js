const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');

const getAllCategoriesQuery = async (keyword = '', userId = 0) => {
  let connection;

  try {
    connection = await getDB();

    const [categories] = await connection.query('SELECT * FROM categories');
    [userId, `%${keyword}%`];
    return categories;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getAllCategoriesQuery;
