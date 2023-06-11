const { getDB, generateError } = require('../../helpers');

const getAllCategories = async (req, res, next) => {
  try {
    // Obtén la conexión a la base de datos.
    const connection = await getDB();

    // Obtén todas las categorías de la base de datos
    const [categories] = await connection.query('SELECT * FROM categories');

    // Envía la respuesta al cliente con las categorías.
    res.send({
      status: 'success',
      categories,
    });
  } catch (error) {
    next(generateError('Error al obtener las categorías', 500));
  }
};

module.exports = getAllCategories;
