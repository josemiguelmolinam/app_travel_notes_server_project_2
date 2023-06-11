const selectUserByIdQuery = require('../../db/queries/users/selectUserByIdQuery');

const getOwnUser = async (req, res, next) => {
  try {
    // Obtenemos el usuario por su ID almacenado en req.user.id
    const user = await selectUserByIdQuery(req.user.id);

    res.send({
      status: 'ok',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getOwnUser;
