const { getDB, generateError } = require('../../helpers');
const deleteCategoryQuery = require("../../db/queries/notes/deleteCategoryQuery");

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    await deleteCategoryQuery(categoryId);

    res.send({
      status: 'Success',
      message: 'Categoría eliminada exitosamente',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteCategory;
