const express        = require('express');
const port           = process.env.PORT || 3000;
const morgan         = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const router         = require('./config/routes.js');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');


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

//use url encoded to parse body of put and post requests
app.use(bodyParser.urlencoded({ extended: true }));

//use method overide to allow express to deal with put requests
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//use router from router.js to route requests
app.use('/', router);

//make app listen
app.listen(port, () => console.log('express listening on port 3000!'));
