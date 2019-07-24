const express = require('express');
const bodyParser = require('body-parser');
const todo = require('./routes/product.route');
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  next();
});

const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://someone_user:useruseruser@clusterofdasha-s5hux.mongodb.net/test?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/todos', todo);

let port = 1234;
app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});