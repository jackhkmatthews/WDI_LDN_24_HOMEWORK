const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  'first name': ({type: String, trim: true, required: true}),
  'last name': ({type: String, trim: true, required: true}),
  'username': ({type: String, trim: true, required: true}),
  'email': ({type: String, trim: true, required: true}),
  'password': ({type: String, trim: true, required: true})
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);