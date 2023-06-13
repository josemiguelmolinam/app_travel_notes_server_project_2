const newNote = require('./newNote');
const listNotes = require('./listNotes');
const getNotes = require('./getNotes');
const editNote = require('./editNote');
const deleteNote = require('./deleteNote');
const createNewCategory = require('./createNewCategory');
const editCategory = require('./editCategory');
const deleteCategory = require('./deleteCategory');
const getAllCategories = require('./getAllCategories');
const updateNotePrivacy = require('./updateNotePrivacy');

module.exports = {
  newNote,
  listNotes,
  getNotes,
  editNote,
  deleteNote,
  createNewCategory,
  editCategory,
  deleteCategory,
  getAllCategories,
  updateNotePrivacy,
};
