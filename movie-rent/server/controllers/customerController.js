const Movie = require('../models/movieModel');
const Rental = require('../models/rentalModel');

// Browse available movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ available: true });
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching movies', error });
  }
};

// Reserve a movie for rental
exports.reserveMovie = async (req, res) => {
  try {
    const rental = new Rental({
      movie: req.body.movieId,
      customer: req.user._id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1-week rental
    });
    await rental.save();
    res.status(201).json(rental);
  } catch (error) {
    res.status(400).json({ message: 'Error reserving movie', error });
  }
};

// View rental history
exports.viewRentalHistory = async (req, res) => {
  try {
    const rentals = await Rental.find({ customer: req.user._id }).populate('movie');
    res.json(rentals);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching rental history', error });
  }
};
