const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  description: { type: String },
  youtubeId: { type: String }
//   rating: { type: Number, enum: [0,1,2,3,4,5], required: true }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Meme', memeSchema);
