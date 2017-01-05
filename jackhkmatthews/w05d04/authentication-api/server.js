const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./config/routes');
const config = require('./config/config');
// const User = require('./models/user');

const app = express();

mongoose.connect(config.db, () => console.log(`mongoose connected to: ${config.db}`));

// User.collection.drop();

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: true }));
app.use('/api', router);

app.listen(config.port, console.log(`express listening at port ${config.port}`));
