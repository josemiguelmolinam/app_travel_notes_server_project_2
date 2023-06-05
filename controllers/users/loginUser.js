const { generateError } = require("../../helpers");

const loginUser = async (req, res, next) => {
    try {
       const { email, password } = req.body;

       if (!email || !password) {
           generateError('Faltan campoc', 400);
           
       }
    } catch (err) {
        next(err);
    }
}

module.exports = loginUser;