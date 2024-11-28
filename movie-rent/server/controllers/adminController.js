const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const Rental = require('../models/rentalModel');

// Create a new user (Admin, Staff, Customer)
exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error adding user', error });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error });
  }
};

// Add a new movie
exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: 'Error adding movie', error });
  }
};

// Update movie details
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: 'Error updating movie', error });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting movie', error });
  }
};

// Generate rental and revenue reports
exports.generateReports = async (req, res) => {
  try {
    const rentals = await Rental.find().populate('movie').populate('customer');
    res.json(rentals);
  } catch (error) {
    res.status(400).json({ message: 'Error generating reports', error });
  }
};
