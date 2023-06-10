const { getDB, generateError } = require('../../helpers');
const editCategoryQuery = require("../../db/queries/notes/editCategoryQuery");
const editCategory = async (req, res, next) => {
    try {
      // Obtén los parámetros necesarios de la solicitud
      const { categoryId } = req.params;
      const { name } = req.body;
  
      // Realiza las operaciones de edición en la base de datos
      const connection = await getDB();
      await connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, categoryId]);
  
      // Envía la respuesta al cliente
      res.send({
        status: 'Success',
        message: 'Categoría editada exitosamente',
      });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = editCategory;
  