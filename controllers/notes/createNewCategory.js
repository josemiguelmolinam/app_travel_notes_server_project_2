const createNewCategoryQuery = require('../../db/queries/notes/createNewCategoryQuery');

const createNewCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    // Llama a la función de consulta para crear la categoría en la base de datos.
    await createNewCategoryQuery(name);

    res.send({
      status: 'Success',
      message: 'Categoría creada existosamente',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createNewCategory;
