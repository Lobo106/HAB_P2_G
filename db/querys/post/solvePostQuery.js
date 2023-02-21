const getDB = require('../../getDB');


const solvePostQuery = async (id) => {
    let connection;

    try {
        connection = await getDB();

        //Comprobamos si el post existe
        //await selectPostById;

        // Comprobamos si el post está resuelto o no resuelto
       const resuelto = await connection.query(
            `SELECT resuelto FROM posts WHERE id = ?`,
        [id]
        );
console.log(resuelto);
        // Si el post está sin resolver, lo resolvemos.
        if (resuelto[0] === 0) {

            await connection.query(`UPDATE posts SET resuelto = 1 WHERE id = ?`,
                [id])
            //Devolvemos el nuevo estado de la inidencia
            return true;
        }
        //Si el post está resuelto, lo volvemos a poner como que no está resuelto
        else{

            await connection.query(`UPDATE posts SET resuelto = 0 WHERE id = ?`,
                [id])

            //Devolvemos el nuevo estado de la inidencia
            return false;
        }

    } finally {
        if (connection) connection.release();
    }
};

module.exports = solvePostQuery;
