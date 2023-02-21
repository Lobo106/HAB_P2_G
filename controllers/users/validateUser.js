const activeUserQuery = require('../../db/queries/users/activeUserQuery');

const validateUser = async (req, res, next) => {
    try {
        const { registrationCode } = req.params;

        await activeUserQuery(registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario activado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = validateUser;
