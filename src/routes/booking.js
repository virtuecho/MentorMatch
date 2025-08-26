const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking');
const { authenticate } = require('../middleware/auth');
const { checkRole } = require('../middleware/role');

// Mentee creates booking
router.post('/create', authenticate, checkRole('mentee'), bookingController.createBooking);

// Mentee cancels booking
router.post('/cancel', authenticate, checkRole('mentee'), bookingController.cancelBooking);

// Mentor responds to booking
router.patch('/:id/respond', authenticate, checkRole('mentor'), bookingController.respondToBooking);

module.exports = router;
