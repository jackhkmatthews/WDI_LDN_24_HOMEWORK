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

userSchema.methods.validatePassword = validatePassword;

function validatePassword(password) {
  console.log(`validating password ${password}`);
  return bcrypt.compareSync(password, this.passwordHash);
}



module.exports = mongoose.model('User', userSchema);
