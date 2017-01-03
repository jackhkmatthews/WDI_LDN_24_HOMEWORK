const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  'name': {type: String, trim: true},
  'twitter': {type: String},
  'github': {type: String},
  'image': {type: String},
  'bio': {type: String},
  'portfolio': {type: String},
  'projects': [{ type: mongoose.Schema.ObjectId, ref: 'Project' }]
}, {
  timestamps: true
});

userSchema.set('toJson', {getters: true, setters: true, virtuals: false});

module.exports = mongoose.model('User', userSchema);
