const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function autheticationsRegister(req, res) {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(400).json({message: 'please sumbit proper information'});

    //create token
    //sign(data to be included in token,
    //      secret to be user to encoded and hence verify signature,
    //      expiry time)
    const token = jwt.sign(user._id, config.secret, {expiresIn: 60*5});

    return res.status(200).json({
      message: 'user registered!',
      user,
      token
    });

  });
}

function authenticationsLogin(req, res){
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(404).json({message: 'email not registered'});

    //comparing passwords, if dont match do this
    console.log(user.validatePassword);
    if (!user.validatePassword(req.body.password)) return res.status(404).json({
      message: 'passord doesnt match'
    });

    //if do match drop a token and send user profile back
    //sign(data to be included in token,
    //      secret to be user to encoded and hence verify signature,
    //      expiry time)
    const token = jwt.sign(user._id, config.secret, {expiresIn: 60*5});

    //send back token which will then be accessed client side
    return res.status(200).json({
      message: 'password matches!',
      user,
      token
    });
  });
}

module.exports = {
  register: autheticationsRegister,
  login: authenticationsLogin
};
