const jwt = require('./jwt');

module.exports = {
  adminConnected: async (req, res, next) => {
    const autHeader = req.headers.authorization;
    const token = autHeader && autHeader.split(' ')[1];

    if (!token) {
      return res.status(401).send({
        msg: 'Acesso negado, você precisa estar logado',
      });
    }

    try {
      const { isAdmin } = jwt.verify(token);

      if (!isAdmin) {
        return res.status(401).send({
          msg: 'Você não é um admin',
        });
      }

      next();
    } catch (err) {
      res.status(400).send({
        msg: 'token inválido',
      });
    }
  },
};
