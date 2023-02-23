const selectUserByEmailQuery = require('../../db/querys/users/selectUserByEmailQuery');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {
    try {
        // Obtenemos el email y la contraseña.
        const { email, password } = req.body;

        // Si falta algún dato lanzamos un error.
        if (!email || !password) {
            generateError('Faltan campos', 400);
        }

        // Localizamos al usuario con el email del body.
        const user = await selectUserByEmailQuery(email);

        // Comprobamos si la contraseña que nos envía el usuario a través del body
        // coincide con la contraseña que figura en la base de datos.
        const validPassword = await bcrypt.compare(password, user.password);

        // Si la constraseña no es correcta lanzamos un error.
        if (!validPassword) {
            generateError('Contraseña incorrecta', 401);
        }

        // Objeto con información que queremos añadir al token.
        const userInfo = {
            id: user.id
        };

        // Creamos el token.
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
