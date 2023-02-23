const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');
const nodemailer = require('nodemailer');
const { SMTP_USER, SMTP_PASS, UPLOADS_DIR } = process.env;

const transport = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

const generateError = (msg, status) => {
    const err = new Error(msg);
    err.httpStatus = status;
    throw err;
};

/**
 * ###############
 * ## Send Mail ##
 * ###############
 */

const sendMail = async (to, subject, text) => {
    try {
        await transport.sendMail({
            from: SMTP_USER,
            to,
            subject,
            text,
        });
    } catch (err) {
        console.error(err);
        generateError('Error al enviar el email de verificación');
    }
};





/**
 * ################
 * ## Save Image ##
 * ################
 */

const saveImg = async (img, resizePx) => {
    // Creamos la ruta absoluta al directorio donde vamos a subir las imágenes.
    const uploadsPath = path.join(__dirname, UPLOADS_DIR);

    try {
        // Intentamos acceder al directorio de subida de archivos mediante el método
        // "access". Este método genera un error si no es posible acceder arl archivo
        // o directorio.
        await fs.access(uploadsPath);
    } catch {
        // Si "access" lanza un error entramos en el catch y creamos el directorio.
        await fs.mkdir(uploadsPath);
    }

    // Convertimos la imagen en un objeto de tipo Sharp.
    const sharpImg = sharp(img.data);

    // Redimensionamos la imagen al ancho que enviamos.
    sharpImg.resize(resizePx);

    // Generamos un nombre único para la imagen.
    const imgName = `${uuid()}.jpg`;

    // Generamos la ruta absoluta a la imagen que queremos guardar.
    const imgPath = path.join(uploadsPath, imgName);

    // Guardamos la imagen en el directorio de subida de imágenes.
    await sharpImg.toFile(imgPath);

    // Retornamos el nombre de la imagen.
    return imgName;
};

/**
 * ##################
 * ## Delete Image ##
 * ##################
 */

const deleteImg = async (imgName) => {
    try {
        // Creamos la ruta absoluta a la imagen que queremos eliminar.
        const imgPath = path.join(__dirname, process.env.UPLOADS_DIR, imgName);

        try {
            // Intentamos acceder a la imagen utilizando el método "access" de fs. Este
            // método genera un error si no es posible acceder al archivo.
            await fs.access(imgPath);
        } catch (error) {
            // Si "access" genera un error entramos en el "catch". Finalizamos la función
            // dado que la imagen no existe, no tiene sentido borrarla.
            return;
        }

        // Si llegamos hasta aquí quiere decir que la imagen existe. La eliminamos.
        await fs.unlink(imgPath);
    } catch {
        generateError('Error al eliminar la imagen del servidor');
    }
};

module.exports = {
    generateError,
    saveImg,
    deleteImg,
    sendMail
};