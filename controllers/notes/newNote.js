const insertNoteQuery = require('../../db/queries/notes/insertNoteQuery');
const insertPhotoQuery = require('../../db/queries/notes/insertPhotoQuery');
const { generateError } = require('../../helpers');

const newNote = async (req, res, next) => {
  try {
    const { title, text, categoryId } = req.body;

    if (!title || !text || !categoryId) {
      generateError('Falta campos', 400);
    }

    const entry = await insertNoteQuery(title, text, categoryId, req.user.id);

    // array donde pushereamos el nombre las fotos si las hay
    const photos = [];

    //si req.file existe quiere decir q hay algun archivo
    if (req.file) {
      //recorremos las fotos usando el metodo value
      for (const photo of Object.values(req.files).slice(0, 3)) {
        const photoName = await savePhoto(photo, 500);

        //Insertanos la foto y obtenemos los datos
        const newPhoto = await insertPhotoQuery(photoName, entry.id);

        // Pusheamos la foto al array de fotos.
        photos.push(newPhoto);
      }
    }

    res.send({
      status: 'Success',
      data: {
        entry: {
          ...entry,
          photos,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newNote;
