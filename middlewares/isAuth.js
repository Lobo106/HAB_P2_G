const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const isAuth = async (req, res, next) => {
    try {
        // Obtenemos el token de la cabecera.
        const { authorization } = req.headers;

        // Si falta el token lanzamos un error.
        if (!authorization) {
            generateError('Falta la cabecera de autorización', 401);
        }

        // Variable que contendrá la información del token una vez desencriptado.
        let userInfo;

        try {
            // Intentamos obtener la info del token.
            userInfo = jwt.verify(authorization, process.env.SECRET);
        } catch {
            generateError('Token incorrecto', 401);
        }

        // Agregamos una nueva propiedad (inventada por nosotros) al objeto "request".
        req.user = userInfo;

        // Pasamos el control al siguiente middleware o función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = isAuth;
