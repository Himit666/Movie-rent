const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/rental', authMiddleware, roleMiddleware('Staff'), staffController.processRental);
router.put('/return/:id', authMiddleware, roleMiddleware('Staff'), staffController.processReturn);
router.get('/overdue', authMiddleware, roleMiddleware('Staff'), staffController.trackOverdue);

module.exports = router;
