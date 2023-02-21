const getDB = require('../../getDB');

const bcrypt = require('bcrypt');

const { generateError } = require('../../../helpers');

const insertUserQuery = async (name, email, password, registrationCode) => {
    let connection;

    try {
        connection = await getDB();

        // Seleccionamos a todos los usuarios con el nombre de usuario que recibimos.
        let [users] = await connection.query(
            `SELECT id FROM users WHERE name = ?`,
            [name]
        );

        // Si ya existe un usuario con ese nombre de usuario lanzamos un error.
        if (users.length > 0) {
            generateError('Nombre de usuario no disponible', 403);
        }

        // Seleccionamos a todos los usuarios con el email que recibimos.
        [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        // Si ya existe un usuario con ese email lanzamos un error.
        if (users.length > 0) {
            generateError(
                'Ya existe un usuario con ese email en la base de datos',
                403
            );
        }

        // Encriptamos la contraseña.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertamos el usuario.
        await connection.query(
            `INSERT INTO users (name, email, password, registrationCode) VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, registrationCode]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;
