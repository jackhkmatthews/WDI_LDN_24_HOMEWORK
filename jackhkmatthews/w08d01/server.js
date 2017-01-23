const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const beerRouter = require('./config/beer-routes');
const config = require('./config/config');
const dest = `${__dirname}/public`;

mongoose.connect(config.db, () => console.log(`connected to db: ${config.db}`));

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(dest));

app.use('/api', beerRouter);
app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));

app.listen(config.port, () => console.log(`server listening at ${config.port}`));
