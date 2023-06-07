const insertNoteQuery = require("../../db/queries/notes/insertNoteQuery");
const insertPhotoQuery = require("../../db/queries/notes/insertPhotoQuery");
const { generateError } = require("../../helpers");

const newNote = async (req, res, next) => {
  try {
    const { tittle, text } = req.body;

    if (!title || !text) {
      generateError("Falta campos", 400);
    }

    const entry = await insertNoteQuery(title, text, req.user.id);

    // array donde pushereamos el nombre las fotos si las hay
    const photos = [];

    //si req.file existe quiere decir q hay algun archivo
    if (req.file) {
      //recorremos las fotos usando el metodo value
      for (const photo of Object.values(req.files)) {
        const photoName = await savePhoto(photo, 500);

        //Insertanos la foto y obtenemos los datos
        const newPhoto = await insertPhotoQuery(photoName, entry.id);
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
    })
  } catch (err) {
    next(err);
  //pusheamos la fot al array de fotos
   photos.push(newPhoto);
  }
};

    
module.exports = newNote;

