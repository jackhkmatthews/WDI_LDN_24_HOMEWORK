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
//normally is would be rejected
//we will make mongoose listen for this field
//save it in a virtual field to be compared against passwordConfirmation
//hash it and save it in the passwordHash field

userSchema
  .virtual('password') //let password field in as a virtual, otherwise rejected
  .set(setPassword); //set = run before 'setting' to db

//value = password field
function setPassword(password){
  this._password = password; //_password is an new actual field which will then
  //be rejected before 'set', just like the original password field
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
  //whenever passwordHash present (path relates to fields listed in the Schema)
  .path('passwordHash')
  //run validate(another mongoose function)
  .validate(validatePasswordHash, 'error, something went wrong');


//compare validate the password hashes by comparision
function validatePasswordHash(){
  //if its a new document
  if(this.isNew){
    if (!this._password) {
      return this.invalidate('password', 'a password is required');
    }
    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'passwords must match');
      //this.invalidate = mongoose function for handling invalidation, allows
      //different error messages for each case
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
