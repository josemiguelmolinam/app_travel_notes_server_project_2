const updateNotePrivacyQuery = require('../../db/queries/notes/updateNotePrivacyQuery');

const updateNotePrivacy = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { isPublic } = req.body;

    // Lógica para verificar y validar los datos de entrada.

    // Llama a la función de la consulta para actualizar la privacidad de la nota en la base de datos.
    await updateNotePrivacyQuery(noteId, isPublic);

    // Envía la respuesta al cliente.
    res.send({
      status: 'Success',
      message: 'Privacidad de la nota actualizada exitosamente',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateNotePrivacy;
