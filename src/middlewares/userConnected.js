const jwt = require('../helpers/jwt');

module.exports = {
  userConnected: async (req, res, next) => {
    const autHeader = req.headers.authorization;
    const token = autHeader && autHeader.split(' ')[1];

    if (!token) {
      return res.status(401).send({
        error: 'Access denied',
      });
    }

    try {
      const credentials = await jwt.verify(token);

      req.credentials = credentials;

      next();
    } catch (err) {
      res.status(400).send({
        error: 'Invalid token',
      });
    }
  },
};
