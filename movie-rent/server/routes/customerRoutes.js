const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/movies', authMiddleware, customerController.getMovies);
router.post('/reserve', authMiddleware, customerController.reserveMovie);
router.get('/rentals', authMiddleware, customerController.viewRentalHistory);

module.exports = router;
