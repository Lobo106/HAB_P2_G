const mysql = require('mysql2/promise');

// Obtenemos las variables de entorno requeridas.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable que almacenará un grupo de conexiones (algo así como un array).
let pool;

// Función que retorna una conexión libre con la base de datos.
const getDB = async () => {
    try {
        // Si no hay un grupo de conexiones lo creamos.
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        // Retornamos una de las 10 conexiones libres con la base de datos.
        return await pool.getConnection();
    } catch (err) {
        console.error(err);
    }
};

// Exportamos la función anterior.
module.exports = getDB;
