const selectAllNotesQuery = require('../../db/queries/notes/selectAllNotesQuery');
const listNotes = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    //para ver las entradas hay que estar logueados
    const notes = await selectAllNotesQuery(keyword, req.user.id);

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
