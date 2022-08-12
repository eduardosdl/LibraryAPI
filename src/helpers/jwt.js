require('dotenv/config');
const jwt = require('jsonwebtoken');

const sign = (payload) => {
    const secret = process.env.SECRET
    const token = jwt.sign(payload, secret, {expiresIn: 86400});

    return token;
}

module.exports = {
    sign
}
    