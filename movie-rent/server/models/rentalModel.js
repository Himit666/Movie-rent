const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rentalDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: Date,
  status: { type: String, enum: ['Rented', 'Returned', 'Overdue'], default: 'Rented' },
});

module.exports = mongoose.model('Rental', rentalSchema);
