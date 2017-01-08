const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: ({type: String, trim: true, required: true}),
  lastName: ({type: String, trim: true, required: true}),
  username: ({type: String, trim: true, required: true, unique: true}),
  email: ({type: String, trim: true, required: true}),
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
  this._password = password;
  this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

//need to compare incoming password against password hash
userSchema.methods.validatePassword = validatePassword;

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

//dont want to display entire user profile
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.passwordHash;
    delete ret.__v;
    delete ret.updatedAt;
    delete ret.createdAt;
    return ret;
  }
});

//during register want to validate email
userSchema
  .path('email')
  .validate(validateEmail);

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return this.invalidate('email', 'must be a valid email address');
  }
}

//during register want a password confirmation
userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

function setPasswordConfirmation(passwordConfirmation){
  this._passwordConfirmation = passwordConfirmation;
}

userSchema
  .path('passwordHash')
  .validate(validateRegisterPasswords);

function validateRegisterPasswords() {
  if (this.isNew) {
    if (!this._password) {
      return this.invalidate('password', 'A password is required.');
    }

    if (this._password.length < 6) {
      this.invalidate('password', 'must be at least 6 characters.');
    }

    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
}

module.exports = mongoose.model('User', userSchema);
