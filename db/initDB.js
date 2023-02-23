// No es necesario replicar este código en "getDB.js".
require('dotenv').config();

// Importamos la función que permite obtener una conexión con la base de datos.
const getDB = require('./getDB');

// Función que se encarga de crear las tablas.
const createTables = async () => {
    // Variable que almacenará una conexión libre con la base de datos.
    let connection;

    try {
        // Intentamos obtener una conexión libre.
        connection = await getDB();

        console.log('Borrando tablas...');

        await connection.query('DROP TABLE IF EXISTS posts');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                registrationCode VARCHAR(100),
                active BOOLEAN DEFAULT FALSE,
                avatar VARCHAR(100),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY(idUser) REFERENCES users(id),
                title VARCHAR(100) NOT NULL,
                text VARCHAR(280) NOT NULL,
                barrio VARCHAR(100) NOT NULL,          
                photo VARCHAR(100),
                resuelto BOOLEAN DEFAULT FALSE,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            INSERT INTO users (name, email, password, active)
            VALUES( 'Administrador', 'administrador@gmail.com', '12345', '1')`)

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        // Si existe una conexión la liberamos.
        if (connection) connection.release();

        // Cerramos el proceso (opcionalmente).
        process.exit();
    }
};

// Llamamos a la función anterior.
createTables();
