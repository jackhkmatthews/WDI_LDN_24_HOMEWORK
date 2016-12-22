const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  artist: { type: String, trim: true },
  description: { type: String },
  youtubeId: { type: String }
//   rating: { type: Number, enum: [0,1,2,3,4,5], required: true }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Video', videoSchema);
