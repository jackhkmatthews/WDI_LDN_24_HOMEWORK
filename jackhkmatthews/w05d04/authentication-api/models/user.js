const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }
});

//when registering, the post request will include a password field
//this password field is not included in the Schema
//normally is would be ignored
//we will make mongoose listen for this field
//save it in a virtual field
//hash it and save it in the passwordHash field

userSchema
  .virtual('password')
  .set(setPassword);

//value = password field
function setPassword(value){
  this._password = value;
  this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
}

//repeat the above for the passwordConfirmation field

//will listen for 'passwordConfirmation' and set a value
userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

//Q1: are we comparing hashes? If so why not compare the passwords?
//Q2: why isNew? as is testing on when ever a password hash is present
//Q3: what does .virtual actually do? what is the method? is it a method?
function setPasswordConfirmation(value){
  this._passwordConfirmation = value;
}

//will also listen for path passwordHash and validate it against
//hash of password confirmation
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



module.exports = mongoose.model('User', userSchema);
