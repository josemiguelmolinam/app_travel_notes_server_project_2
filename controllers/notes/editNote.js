const selectAllNotesIdQuery = require('../../db/queries/notes/selectAllNotesIdQuery');
const { generateError } = require('../../helpers');
const editNote = async (req, res, next) => {
  try {
    let { title, text, categoryId } = req.body;

    if (!title && !text && !categoryId) {
      generateError('Faltan campos', 400);
    }

    // Obtenemos la nota actual por su ID
    const note = await selectAllNotesIdQuery(req.params.noteId);

    if (!note) {
      generateError('La nota no existe', 404);
    }

    // Establecemos los valores por defecto si no se proporcionan
    title = title || note.title;
    text = text || note.text;
    categoryId = categoryId || note.categoryId;

    // Actualizar los datos de la nota
    await editNoteQuery(title, text, categoryId, req.params.noteId);
    res.send({
      status: 'Success',
      message: 'Nota actualizada con éxito',
      data: {
        title,
        text,
        categoryId,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editNote;
