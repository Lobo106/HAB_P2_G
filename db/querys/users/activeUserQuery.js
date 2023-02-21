const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const activeUserQuery = async (registrationCode) => {
    let connection;

    try {
        connection = await getDB();

        // Seleccionamos a los usuarios con ese código de registro.
        const [users] = await connection.query(
            `SELECT id FROM users WHERE registrationCode = ?`,
            [registrationCode]
        );

        // Si no existe ningún usuario lanzamos un error.
        if (users.length < 1) {
            generateError('Código incorrecto', 404);
        }

        // Activamos el usuario.
        await connection.query(
            `UPDATE users SET active = true, registrationCode = null WHERE registrationCode = ?`,
            [registrationCode]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = activeUserQuery;
