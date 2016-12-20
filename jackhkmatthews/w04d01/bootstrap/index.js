const express        = require('express');
const morgan         = require('morgan');
const port           = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');
const router         = require('./config/router').router;

var app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(expressLayouts);
app.use('/', router);

app.listen(port, () => console.log(`express is listening on port ${port}`));
