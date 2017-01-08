const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: ({type: String, trim: true, required: true}),
  lastName: ({type: String, trim: true, required: true}),
  username: ({type: String, trim: true, required: true}),
  email: ({type: String, trim: true, required: true}),
  // password: ({type: String, trim: true, required: true}),
  passwordHash: ({type: String, required: true})
}, {
  timestamps: true
});

//listen for password
//make virtual field
//convert into passwordHash and save

userSchema
  .virtual('password')
  .set(setPassword);

function setPassword(password){
  // this._password = password
  this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

//need to compare incoming password against password hash
userSchema.methods.validatePassword = validatePassword;

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model('User', userSchema);
