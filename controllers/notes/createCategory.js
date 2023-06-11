const createCategoryQuery = require("../../db/queries/notes/createCategoryQuery");

const createCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    // Llama a la función de consulta para crear la categoría en la base de datos.
    await createCategoryQuery(categoryId,);

    res.send({
      status: "Success",
      message: "Categoría creada existosamente",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createCategory;

