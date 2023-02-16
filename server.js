require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

// Creamos el servidor.
const app = express();

// Middleware que evita problemas con las CORS a la hora de conectar el cliente con el servidor.
app.use(cors());

// Middleware que indica al servidor cuál es el directorio de ficheros estáticos.
app.use(express.static(process.env.UPLOADS_DIR));

// Middleware que muestra información por consola sobre la petición entrante.
app.use(morgan('dev'));

// Middleware que permite deserializar un body en formato "raw" creando la propiedad
// "body" en el objeto "request".
app.use(express.json());

// Middleware que permite deserializar un body en formato "form-data" creando la propiedad
// "body" y "files" en el objeto "request".
app.use(fileUpload());






// Ponemos el servidor a escuchar peticiones en un puerto dado.
app.listen(process.env.PORT, () => {
    console.log(`Server listenting at http://localhost:${process.env.PORT}`);
});
