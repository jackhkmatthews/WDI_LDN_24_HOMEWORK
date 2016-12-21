const express = require('express');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const router = require('./config/routes.js');

const app = express();

//configure express app to look in views and use ejs when rendering files to browser
app.set('views', './views');
app.set('view engine', 'ejs');

//use morgan for logging
app.use(morgan('dev'));

//use express-ejs-layouts for layouts
app.use(expressLayouts);

//use express static to serve 'static' files
app.use(express.static('public'));

//use router from router.js to route requests
app.use('/', router);

//make app listen
app.listen(port, () => console.log('express listening on port 3000!'));
