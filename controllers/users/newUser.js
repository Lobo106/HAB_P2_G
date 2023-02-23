const insertUserQuery = require('../../db/querys/users/insertUserQuery');

const { v4: uuid } = require('uuid');

const { sendMail, generateError } = require('../../helpers');

const { HOST, PORT } = process.env;

const newUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            generateError('Faltan campos', 400);
        }

        // Generamos un código de registro.
        const registrationCode = uuid();

        // Registramos el usuario en la base de datos.
        await insertUserQuery(name, email, password, registrationCode);

        // Creamos el asunto del email.
        const subject = 'Activa tu usuario en Ciudad Sostenible';

        // Creamos el contenido.
        const emailContent = `
            ¡Bienvenid@ ${name}!

            Por favor, verifica tu usuario a través del siguiente enlace: 

            http://${HOST}:${PORT}/users/validate/${registrationCode}
        `;

        // Enviamos el email de verificación al email del usuario.
        await sendMail(email, subject, emailContent);

        res.send({
            status: 'ok',
            message:
                'Usuario creado. Verifique su identidad a través del email de activación.',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUser;
