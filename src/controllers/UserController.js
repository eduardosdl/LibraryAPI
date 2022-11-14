const bcrypt = require('bcrypt');

const jwt = require('../helpers/jwt');
const User = require('../models/User');

const createUser = async (req, res) => {
  const {
    name, email, password, confirmPassword,
  } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).send({
      error: 'All fields are required',
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({
      error: 'Passwords do not match',
    });
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).send({
      error: 'This e-mail is already in use',
    });
  }

  const user = await User.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign({ id: user._id, isAdmin: user.admin });

  res.status(201).send({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
};

const loginUser = async (req, res) => {
  const [, hash] = req.headers.authorization.split(' ');
  const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

  if (!email || !password) {
    return res.status(400).send({
      error: 'All fields are required',
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(404).send({
      error: 'User not found',
    });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(401).send({
      error: 'Password invalid',
    });
  }

  const token = jwt.sign({ id: user._id, isAdmin: user.admin });

  res.status(200).send({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
};

const editUser = async (req, res) => {
  const { id } = req.credentials;
  const { name, email } = req.body;

  // const user = await User.findById(id);
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).send({
      error: 'This e-mail is already in use',
    });
  }

  await User.updateOne({ id }, {
    email,
    name,
  });

  res.status(200).send({
    name,
    email,
  });
};

const editUserPass = async (req, res) => {
  const { id } = req.credentials;
  const { password, confirmPassword } = req.body;

  const user = await User.findById(id);

  if (password !== confirmPassword) {
    return res.status(400).send({
      error: 'Passwords do not match',
    });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  await User.updateOne({ _id: user._id }, { password: passwordHash });

  res.sendStatus(204);
};

const editUserAdmin = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  await User.updateOne({ _id: user._id }, { admin: !user.admin });

  res.sendStatus(204);
};

const deleteUser = async (req, res) => {
  const { id } = req.credentials;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).send({
      error: 'User not found',
    });
  }

  await User.deleteOne({ _id: user._id });

  res.sendStatus(204);
};

module.exports = {
  createUser,
  loginUser,
  editUser,
  editUserPass,
  editUserAdmin,
  deleteUser,
};
