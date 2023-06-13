const { getDB, generateError } = require('../../../helpers');

const updateNotePrivacyQuery = async (noteId, isPublic) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query('UPDATE notes SET isPublic = ? WHERE id = ?', [
      isPublic,
      noteId,
    ]);

    //Si se realizó la actualización correctamente, no es necesario retornar nada.
  } catch (error) {
    // Manejo de errores.
    console.error(error);
    throw new Error('Error al actualizar la privacidad de la nota');
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateNotePrivacyQuery;
