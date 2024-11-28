const Rental = require('../models/rentalModel');
const Movie = require('../models/movieModel');

// Process a new rental
exports.processRental = async (req, res) => {
  try {
    const rental = new Rental(req.body);
    rental.dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1-week rental period
    await rental.save();
    res.status(201).json(rental);
  } catch (error) {
    res.status(400).json({ message: 'Error processing rental', error });
  }
};

// Process a movie return
exports.processReturn = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    rental.returnDate = Date.now();
    rental.status = 'Returned';
    await rental.save();
    res.json(rental);
  } catch (error) {
    res.status(400).json({ message: 'Error processing return', error });
  }
};

// Track overdue movies
exports.trackOverdue = async (req, res) => {
  try {
    const overdueRentals = await Rental.find({ status: 'Rented', dueDate: { $lt: new Date() } }).populate('customer').populate('movie');
    res.json(overdueRentals);
  } catch (error) {
    res.status(400).json({ message: 'Error tracking overdue rentals', error });
  }
};
