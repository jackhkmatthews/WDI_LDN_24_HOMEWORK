const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const apiRouter = require('./config/api-routes');
const webRouter = require('./config/web-routes');
const cors = require('cors');

const app = express();

mongoose.connect(config.db, () => console.log(`connected to ${config.db}`));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.use('/api', apiRouter);
app.use('/', webRouter);

app.listen(config.port, () => console.log(`express listening at port ${config.port}`));
