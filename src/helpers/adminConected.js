const jwt = require('./jwt');

module.exports = {
    adminConnected: async (req, res, next) => {
        const autHeader = req.headers['authorization'];
        const token = autHeader && autHeader.split(" ")[1];

        if(!token) {
            return res.status(401).send({
                msg: "Acesso negado"
            });
        }

        try {
            const { isAdmin } = jwt.verify(token);

            if(!isAdmin) {
                throw "você não é um admin";
            }

            next();
        } catch (err) {
            res.status(400).send({
                msg: `token inválido ${err}`
            });
        }
    }
}