const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/user', authMiddleware, roleMiddleware('Admin'), adminController.addUser);
router.put('/user/:id', authMiddleware, roleMiddleware('Admin'), adminController.updateUser);
router.delete('/user/:id', authMiddleware, roleMiddleware('Admin'), adminController.deleteUser);

router.post('/movie', authMiddleware, roleMiddleware('Admin'), adminController.addMovie);
router.put('/movie/:id', authMiddleware, roleMiddleware('Admin'), adminController.updateMovie);
router.delete('/movie/:id', authMiddleware, roleMiddleware('Admin'), adminController.deleteMovie);

router.get('/reports', authMiddleware, roleMiddleware('Admin'), adminController.generateReports);

module.exports = router;
