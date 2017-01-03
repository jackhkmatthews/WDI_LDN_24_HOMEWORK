const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  titles: [{
    main: { type: String, trim: true }
  }],
  colors: [{
    topLeft: { type: String},
    bottomRight: { type: String}
  }],
  creator: { type: mongoose.Schema.ObjectId, ref: 'Creator' },
  imageUrls: [{
    banner: { type: String, trim: true },
    intro: { type: String, trim: true },
    main: { type: String, trim: true },
    concluding: { type: String, trim: true }
  }],
  paragraphs: [{
    intro: { type: String, trim: true },
    main: { type: String, trim: true },
    concluding: { type: String, trim: true }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
