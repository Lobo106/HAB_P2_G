const selectUserByEmailQuery = require('../../db/queries/users/selectUserByEmailQuery');

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

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            generateError('Contraseña incorrecta', 401);
        }

        // Si el usuario no está activo lanzamos un error.
        if (!user.active) {
            generateError('Usuario pendiente de activar', 401);
        }

        const userInfo = {
            id: user.id,
            role: user.role,
        };

        const token = jwt.sign(userInfo, process.env.SECRET, {
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
