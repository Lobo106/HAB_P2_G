//Falta el querry de IdPost
const solvePostQuery = require('../../db/querys/post/solvePostQuery')


const solvePost = async (req, res, next) => {
    try {
        const  {id}  = req.params;
   
console.log(id);
        // Comprobamos si el Post existe.
        //await selectPostByIdQuery(idPost);

        // Cambiamos de estado la incidencia en la base de datos.

        if (await solvePostQuery(id) === true) {
            res.send({
                status: 'ok',
                message: 'Incidencia solventada',
            })
        }

        if (await solvePostQuery(id) === false) {
            res.send({
                status: 'ok',
                message: 'Incidencia activada',
            })
        }
        ;
    } catch (err) {
        next(err);
    }

};


module.exports = solvePost;