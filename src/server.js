const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');

const cors = require('./middlewares/cors');
const router = require('./router');
const error = require('./middlewares/errorHandler');

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:27017/library?authSource=admin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  const app = express();
  const port = process.env.PORT || 3000;

  // parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // cors
  app.use(cors);
  // router
  app.use(router);
  // handle error
  app.use(error);

  app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}`);
  });
}).catch((err) => {
  console.log(`error: ${err}`);
});
