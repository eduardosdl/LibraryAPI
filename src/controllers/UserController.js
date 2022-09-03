const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');
const jwt = require('../helpers/jwt');

const newUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if(!name) {
        return res.status(422).send({
            msg: "O nome é obrigatorio"
        });
    }

    if(!email) {
        return res.status(422).send({
            msg: "O email é obrigatório"
        });
    }

    if(!password) {
        return res.status(422).send({
            msg: "A senha é obrigatório"
        });
    }
    
    if(password != confirmPassword) {
        return res.status(422).send({
            msg: "As senhas não condizem"
        });
    }

    const userExists = await User.findOne({ email });
    
    if(userExists) {
        return res.status(422).send({
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
        const token = jwt.sign({id: user._id, admin: user.isAdmin});

        res.status(201).send({
            msg: "Usuário criado e logado com sucesso",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token
        });
    } catch (err){
        console.log('erro: '+err);
    
        res.status(500).send({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
}

const loginUser = async (req, res) => {
    const [ , hash ] = req.headers.authorization.split(' ');
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

    if(!email) {
        return res.status(422).send({
            msg: "O email é obrigatório"
        });
    }

    if(!password) {
        return res.status(422).send({
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
        return res.status(401).send({
            msg: "Senha incorreta"
        });
    }

    try {
        const token = jwt.sign({ id: user._id, isAdmin: user.admin });

        res.status(200).send({
            msg: "Logado com sucesso",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (err) {
        console.log('erro: '+err);
    
        res.status(500).send({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
}

const editUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, name } = req.body;

    const user = await User.findById(id);
    const userExists = await User.findOne({ email });

    if(userExists) {
        return res.status(422).send({
            msg: "Já existe um usuário com esse email"
        });
    }
    
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
        return res.status(401).send({
            msg: "Senha incorreta"
        });
    }

    try {
        await User.updateOne({ id }, { email, name });

        res.status(200).send({
            msg: "Usuário alterado com sucesso",
            oldData: {
                name: user.name,
                email: user.email
            },
            newData: {
                name,
                email
            }
        });
    } catch (err) {
        console.log('erro: '+err);
    
        res.status(500).send({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
}

const editUserPass = async (req, res) => {
    const { email, password, newPassword } = req.body;

    const user = await User.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
        return res.status(401).send({
            msg: "Senha incorreta"
        });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    try {
        await User.updateOne({ _id: user._id }, { password: passwordHash });

        res.status(200).send({
            msg: "Senha alterada com sucesso"
        });
    } catch (err) {
        console.log('erro: '+err);
    
        res.status(500).send({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
}

const makeAdmin = async (req, res) => {
    const { id } = req.params;
    const { admin } = req.query;
    const user = await User.findById(id);

    if(!user) {
        return res.staus(404).send({
            msg: "Usuário não encontrado"
        });
    }

    try {
        if(admin === "true") {
            user.admin = true;
        } else if (admin === "false") {
            user.admin = false;
        }

        await user.save();

        res.status(200).send({
            data: {
                id: user._id,
                name: user.name,
                admin: user.admin
            }
        });
    } catch (err) {
        console.log('erro: '+err);
    
        res.status(500).send({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
}

const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return res.status(404).send({
            msg: "Usuário não encontrado"
        });
    }

    const checkPassword = await bcrypt.compare(req.body.password, user.password);

    if(!checkPassword) {
        return res.status(401).send({
            msg: "Senha incorreta"
        });
    }

    try {
        await User.deleteOne({_id: user._id});

        res.status(200).send({
            msg: "Usuário apagado com sucesso",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.log('erro: '+err);
    
        res.status(500).send({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
}

module.exports = {
    newUser,
    loginUser,
    editUser,
    editUserPass,
    makeAdmin,
    deleteUser
}