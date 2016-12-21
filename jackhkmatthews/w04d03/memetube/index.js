const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const router = require('./config/routes.js');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('express-method-override');

const databaseUrl = 'mongodb://localhost/memeTube';

mongoose.connect(databaseUrl, () => console.log(`connected to database at ${databaseUrl}`));

//initialise app
const app = express();

//setting for view folder and view engine
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

//use morgan
app.use(morgan('dev'));

//use express layouts
app.use(expressLayouts);

//use express static for static files
app.use(express.static(__dirname + '/public'));

//use body parser
app.use(bodyParser.urlencoded({ extended: true }));

//use method override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//use router
app.use('/', router);

app.listen(port, () => console.log(`server listening on ${port}`));
