const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const router = require('./router');

const app = express();

// config
const port = process.env.PORT || 3000;
// express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
// mongoose
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:27017/library?authSource=admin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('conectou no banco');
}).catch((err) => console.log(`err${err}`));
// routes
app.use(router);

app.listen(port, () => console.log(`Server rodando em http://localhost:${port}`));
