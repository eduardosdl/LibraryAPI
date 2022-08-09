const express = require('express');
const app = express();
const mongoose = require('mongoose');
const book = require('./routes/book');
const category = require('./routes/category');

// config
// express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/biblio').then(() => {
	console.log('Banco de dados conectado com sucesso');
}).catch((err) => console.log(`falha ao se conectar: ${err}`));

// routes
app.use('/book', book)
app.use('/category', category);

const port = 3000;
app.listen(port, () => console.log(`Server rodando em http://localhost:${port}`));
