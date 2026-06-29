const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  genre:       { type: String, default: 'Drama' },
  year:        { type: Number, default: new Date().getFullYear() },
  rating:      { type: Number, default: 7.0 },
  duration:    { type: String, default: '120 min' },
  image:       { type: String, required: true },
  description: { type: String, default: '' },
}, { timestamps: true });
module.exports = mongoose.model('Movie', movieSchema);
