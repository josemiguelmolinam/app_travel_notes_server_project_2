const getAllCategoriesQuery = require('../../db/queries/notes/getAllCategoriesQuery');

const getAllCategories = async (req, res, next) => {
  try {
    const { categoriesId } = req.params;
    // Para ver las entradas hay que estar logueados.
    const categories = await getAllCategoriesQuery(categoriesId, req.user.id);

    // Envía la respuesta al cliente con las categorías.
    res.send({
      status: 'success',
      data: {
        categories,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllCategories;
