const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const router = require('./config/routes');
// const User = require('./models/user');

// User.collection.drop();

const app = express();

mongoose.connect(config.db, () => console.log(`connected to ${config.db}`));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(config.port, () => console.log(`express listening at port ${config.port}`));
