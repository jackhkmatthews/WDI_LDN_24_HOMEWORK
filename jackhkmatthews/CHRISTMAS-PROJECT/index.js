const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const router = require('./config/routes');
const ejsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var methodOverride = require('method-override');

//database bits
const databaseName = 'projects-app';
const databaseUrl  = `mongodb://localhost/${databaseName}`;

mongoose.connect(databaseUrl, () => {
  return console.log(`Connected to db: ${databaseUrl}`);
});

//initialise express app
const app = express();

//views settings
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(ejsLayouts);
app.use(express.static('bower_components'));
app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use('/', router);

//listening
app.listen(port, () => console.log(`express listening at ${port}`));
