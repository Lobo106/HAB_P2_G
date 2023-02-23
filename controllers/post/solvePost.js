//Falta el querry de IdPost
const solvePostQuery = require('../../db/querys/post/solvePostQuery')


const solvePost = async (req, res, next) => {
    try {
        const  {id}  = req.params;
   
console.log(id);
        // Comprobamos si el Post existe.
        //await selectPostByIdQuery(idPost);

        // Cambiamos de estado la incidencia en la base de datos.
        const isResolve = await solvePostQuery(id)

        if (isResolve) {
            res.send({
                status: 'ok',
                message: 'Incidencia solventada',
            })
        }

        if (!isResolve) {
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