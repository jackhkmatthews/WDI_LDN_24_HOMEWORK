const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }
});

//to register

//when registering, the post request will include a password field
//this password field is not included in the Schema
//normally is would be ignored
//we will make mongoose listen for this field
//save it in a virtual field to be compared against passwordConfirmation
//hash it and save it in the passwordHash field

userSchema
  .virtual('password')
  .set(setPassword);

//value = password field
function setPassword(password){
  this._password = password;
  this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

//will listen for 'passwordConfirmation' and set a value to be compared
//to virtual plain test password
userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

//Q2: why isNew? as is testing on when ever a password hash is present
//Q3: what do .virtual and .path actually do? what is the method? is it a method?
function setPasswordConfirmation(value){
  this._passwordConfirmation = value;
}

//will listen for path passwordHash and validate plain password in virtual field
//against passwordConfirmation also stored in virtual field
userSchema
  .path('passwordHash')
  .validate(validatePasswordHash);


//compare validate the password hashes by comparision
function validatePasswordHash(){
  //if its a new document
  if(this.isNew){
    //if the document has not submitted a password which has then not been
    //stored in the docs virtual field
    if (!this._password) {
      return this.invalidate('password', 'a password is required');
    }
    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'passwords must match');
    }
  }
}

//to login

userSchema.methods.validatePassword = validatePassword;

function validatePassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.set('toJSON', {
  transform: function(doc, ret) {  //doc = mongo document, ret = return info
    delete ret.passwordHash;
    delete ret.email;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
