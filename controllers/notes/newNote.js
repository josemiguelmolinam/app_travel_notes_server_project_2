const insertNoteQuery = require('../../db/queries/notes/insertNoteQuery');
const { generateError, savePhoto } = require('../../helpers');

const newNote = async (req, res, next) => {
  try {
    const { title, text, categoryId } = req.body;

    // Verificar si faltan campos obligatorios.
    if (!title || !text || !categoryId) {
    throw generateError('Falta campos', 400);
    }

    let imgName;

    // Verificar si se adjuntó una imagen y guardarla.
    if (req.files?.image) {
      imgName = await savePhoto(req.files.image, 500);
    }
    
    // Insertar la nueva nota en la base datos.
    const note = await insertNoteQuery(
      title,
      text,
      categoryId,
      imgName,
      req.user.id
    );

    // Enviar la respuesta con la nota creada.
    res.send({
      status: 'Success',
      data: {
        note,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newNote;
