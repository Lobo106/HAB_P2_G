const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const selectUserByEmailQuery = async (email) => {
    let connection;

    try {
        connection = await getDB();

        // Seleccionamos a los usuarios con el email recibido.
        const [users] = await connection.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        if (users.length < 1) {
            generateError('Email incorrecto', 404);
        }

        // Si existe un usuario, este se encontrará en la posición 0 del array (no
        // puede haber dos usuarios con el mismo email). Retornamos el objeto del usuario.
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByEmailQuery;
