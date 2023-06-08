const selectAllNotesIdQuery = require('../../db/queries/notes/selectAllNotesQuery');

const getNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    // Para ver las entradas hay que estar logueados.
    const notes = await selectAllNotesIdQuery(noteId, req.user.id);
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

module.exports = getNote;
