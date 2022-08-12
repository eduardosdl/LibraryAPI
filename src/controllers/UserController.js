const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');
require('dotenv/config');
const jwt = require('../helpers/jwt')

const newUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if(!name) {
        return res.status(400).send({
            msg: "O nome é obrigatorio"
        });
    }

    if(!email) {
        return res.status(400).send({
            msg: "O email é obrigatório"
        });
    }

    if(!password) {
        return res.status(400).send({
            msg: "A senha é obrigatório"
        });
    }
    
    if(password != confirmPassword) {
        return res.status(400).send({
            msg: "As senhas não condizem"
        });
    }

    const userExists = await User.findOne({ email });
    
    if(userExists) {
        return res.status(400).send({
            msg: "Já exites um usuário com esse email"
        });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        email,
        password: passwordHash
    });

    try {
        await user.save()

        res.status(201).send({
            msg: "Usuário criado com sucesso"
        });
    } catch (err){
        console.log('erro: '+err);
    
        res.status(500).send({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email) {
        return res.status(400).send({
            msg: "O email é obrigatório"
        });
    }

    if(!password) {
        return res.status(400).send({
            msg: "A senha é obrigatório"
        });
    }

    const user = await User.findOne({ email });
    
    if(!user) {
        return res.status(404).send({
            msg: "Usuário não encontrado"
        });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
        return res.status(400).send({
            msg: "Senha incorreta"
        });
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({ id: user._id });

        res.status(200).send({
            msg: "Logado com sucesso",
            token
        })
    } catch (err) {
        console.log('erro: '+err);
    
        res.status(500).send({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
}

module.exports = {
    newUser,
    loginUser
}