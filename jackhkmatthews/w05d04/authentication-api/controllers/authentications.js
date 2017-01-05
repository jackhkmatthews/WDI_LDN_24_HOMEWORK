const User = require('../models/user');

function authenticationsRegister(req, res){
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(400).json({message: 'please provide releveant information'});
    return res.status(200).json({
      message: `user registered.  Welcome ${user.email}`,
      user
    });
  });
}

function authenticationsLogin(req, res){
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) return res.status(500).json({message: err});
    if (!user) return res.status(400).json({message: 'those details do not match our records'});
    if (user.validatePassword(req.body.password)) {
      return res.status(200).json({
        message: 'password accepted. You\'re in!',
        user
      });
    } else {
      return res.status(404).json({message: 'login failed. Incorrect details'});
    }
  });
}

module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};
