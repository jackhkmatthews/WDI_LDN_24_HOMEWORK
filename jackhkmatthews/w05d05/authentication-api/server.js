const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const router = require('./config/routes');
const expressJWT = require('express-jwt');
// const User = require('./models/user');

// User.collection.drop();

const app = express();

mongoose.connect(config.db, () => console.log(`connected to ${config.db}`));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//need to check for token before allowing requests to the api
//pass secret and specify urls to be ignored
app.use('/api', expressJWT({ secret: config.secret})
  .unless({
    path: [
      {url: '/api/users/login', method: ['POST']},
      {url: '/api/users/register', method: ['POST']}
    ]
  }));

//handling the errors
app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next){
  if (err.name !== 'UnauthorizedError') return next();
  return res.status(401).json({ message: 'Unauthorized request.' });
}

app.use('/api', router);

app.listen(config.port, () => console.log(`express listening at port ${config.port}`));
