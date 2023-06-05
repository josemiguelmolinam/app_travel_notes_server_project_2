const selectUserByEmailQuery = require('../../db/queries/selectUserByEmailQuery');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      generateError('Faltan campos', 400);
    }
    const user = await selectUserByEmailQuery(email);

    const validPass = await bcrypt.compare(password, user.password);
    if(!validPass) {
        generateError('Contraseña incorrecta', 401);
    }

        const tokeInfo = {
            id: user.id,
            
        };
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;