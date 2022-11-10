const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./routes/user');
const book = require('./routes/book');
const category = require('./routes/category');

// config
const port = process.env.PORT || 3000;
// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
	res.header(
		'Access-Control-Allow-Header',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
    res.header("Access-Control-Allow-Methods", 'GET,PATCH,PUT,POST,DELETE');
    app.use(cors());
    next();
});
// express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// mongoose
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:27017/library?authSource=admin`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('Banco de dados conectado com sucesso');
	app.listen(port, () => console.log(`Server rodando em http://localhost:${port}`));
}).catch((err) => console.log(`falha ao se conectar: ${err}`));

// routes
app.use('/user', user);
app.use('/book', book);
app.use('/category', category);