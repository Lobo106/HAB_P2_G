const getDB = require('../../getDB');

const newPostQuery = async (title, text,barrio, photo, idUser) => {
    let connection;

    try {
        connection = await getDB();

        const [tweet] = await connection.query(
            `INSERT INTO posts (title, text, barrio, photo, idUser) VALUES (?, ?, ?, ?, ?)`,
            [title, text, barrio, photo, idUser]
        );

        return {
            id: tweet.insertId,
            title,
            text,
            barrio,
            photo,
            idUser,
            createdAt: new Date(),
        };
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newPostQuery;