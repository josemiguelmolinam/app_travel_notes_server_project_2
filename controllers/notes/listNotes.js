const selectAllNotesQuery = require('../../db/queries/notes/selectAllNotesQuery');
const listNotes = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    // Obtener todas las notas según la palabra clave y el ID del usuario autenticado
    const notes = await selectAllNotesQuery(keyword, req.user.id);

    // Enviar la respuesta con las notas obtenidas.
    res.send({
      status: 'Success',
      data: {
        notes,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listNotes;
