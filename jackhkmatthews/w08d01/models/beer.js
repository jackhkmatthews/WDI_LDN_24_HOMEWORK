const mongoose = require('mongoose');

const beerSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true},
  bio: { type: String, required: true},
  image: { type: String, required: true}
});

module.exports = mongoose.model('Beer', beerSchema);
