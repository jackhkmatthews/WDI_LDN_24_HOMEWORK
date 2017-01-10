const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema({
  lat: {type: String, required: true},
  lng: {type: String, required: true},
  name: {type: String, required: true},
  student: {type: String, required: true},
  weirdness: {type: Number, require: true},
  picture: {type: String}
},{
  timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);
