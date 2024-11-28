const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: String,
  releaseYear: Number,
  stock: Number,
  rentalPrice: Number,
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Movie', movieSchema);
