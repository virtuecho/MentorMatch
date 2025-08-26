const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availability');
const { authenticate } = require('../middleware/auth');

// Availble time slot routes
router.post('/slots', authenticate, availabilityController.createAvailability);
router.get('/slots', authenticate, availabilityController.getMyAvailability);
router.delete('/slots/:slotId', authenticate, availabilityController.deleteAvailability);

module.exports = router;