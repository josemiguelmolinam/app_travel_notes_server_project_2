const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const deleteNoteQuery = async (noteId, userId) => {
    let connection;

    try {
        connection = await getDB();

        const [notes] = await connection.query(
            `SELECT id FROM notes WHERE id = ? AND userId = ?`,
            [noteId, userId]
        );

        if (notes.length < 1) {
            generateError('Nota no encontrada', 404);
        }

        await connection.query(
            `DELETE FROM notes WHERE id = ? AND userId = ?`,
            [noteId, userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteNoteQuery;