const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const todo = require('./routes/task.route');
const user = require('./routes/user.route');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  next();
});

let dev_db_url = 'mongodb://localhost:27017/todoes';
mongoose.connect(dev_db_url);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/users', user);
app.use('/todos', todo);

let port = 1234;
app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});