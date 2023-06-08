const insertNoteQuery = require('../../db/queries/notes/insertNoteQuery');
const { generateError, savePhoto } = require('../../helpers');

const newNote = async (req, res, next) => {
  try {
    const { title, text, categoryId } = req.body;

    if (!title || !text || !categoryId) {
      generateError('Falta campos', 400);
    }

    let imgName;

    if (req.files?.image) {
      imgName = await savePhoto(req.files.image, 500);
    }

    const note = await insertNoteQuery(
      title,
      text,
      categoryId,
      imgName,
      req.user.id
    );

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
