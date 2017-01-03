const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  'name': {type: String, trim: true}
}, {
  timestamps: true
});

projectSchema.set('toJson', {getters: true, setters: true, virtuals: false});

module.exports = mongoose.model('Project', projectSchema);
