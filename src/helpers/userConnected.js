const jwt = require('./jwt');

module.exports = {
    userConnected: async (req, res, next) => {
        const autHeader = req.headers['authorization'];
        const token = autHeader && autHeader.split(" ")[1];

        if(!token) {
            return res.status(401).send({
                msg: "Acesso negado"
            });
        }

        try {
            jwt.verify(token)

            next();
        } catch (err) {
            res.status(400).send({
                msg: "token inválido"
            });
        }
    }
}