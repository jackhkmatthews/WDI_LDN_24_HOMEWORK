const express    = require('express');
const morgan     = require('morgan');
const routes     = require('./config/routes');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const port = process.env.PORT || 3000;

const databaseUrl = process.env.MONGOLAB_UBI || 'mongodb://localhost:27017/express-api-projects';

mongoose.connect(databaseUrl, () => {
  return console.log(`conected to db: ${databaseUrl}`);
});

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', routes);

app.listen(port, console.log(`express listening at ${port}`));
