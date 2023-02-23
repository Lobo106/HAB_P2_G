const newPostQuery = require('../../db/querys/post/newPostQuery')
const { generateError, saveImg } = require('../../helpers');

const newPost = async (req, res, next) => {
    try {
        const { title, text, barrio } = req.body;

        if (!title || !text || !barrio) {
            generateError('Faltan campos', 400);
        }

        // Variable donde almacenaremos el nombre de la imagen (si existe).
        let photo;

        // Comprobamos si existe una imagen. De ser así la guardamos en la carpeta "uploads".
        if (req.files?.photo) {
            photo = await saveImg(req.files.photo, 500);
        }

        // Creamos el post y obtenemos sus datos.
        const post = await newPostQuery(title, text, barrio, photo, req.user.id);

        res.send({
            status: 'ok',
            data: {
                post,
            },
        });
        
    } catch (err) {
        next(err);
    }

};


module.exports = newPost;