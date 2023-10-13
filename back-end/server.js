require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products-routes');
const userRoutes = require('./routes/users-routes.js')
const cors = require('cors');

const PORT = 3000;
const URL = process.env.DB_CONNECTION;

const app = express();
app.use(express.json());

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Method', "*");
  next();
});
app.use(cors());

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`listening port ${PORT}`);
});

app.use(
    productRoutes,
    userRoutes
    );
