const { getDB, generateError } = require('../../helpers');
const editCategoryQuery = require('../../db/queries/notes/editCategoryQuery');

const editCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    // Verificar si se proporcionó el campo requerido
    if (!name) {
      throw generateError('Faltan campos', 400);
    }

    // Llamar a la consulta para editar la categoría en la base de datos
    await editCategoryQuery(categoryId, name);

    res.send({
      status: 'Success',
      message: 'Categoría editada exitosamente',
      data: {
        name,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editCategory;
