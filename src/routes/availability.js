const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availability');
const { authenticate } = require('../middleware/auth');
const { checkRole } = require('../middleware/role'); // Import checkRole middleware

// Availble time slot routes:
// Create availability slot (Mentors only)
router.post('/slots', authenticate, checkRole('mentor'), availabilityController.createAvailability);
// Get current user's availability slots (Mentors only)
router.get('/slots', authenticate, checkRole('mentor'), availabilityController.getMyAvailability);
// Get availability slots for a specific mentor
router.get('/mentor/:mentorId', authenticate, availabilityController.getMentorAvailability);
// Delete availability slot (Mentors only)
router.delete('/slots/:slotId', authenticate, checkRole('mentor'), availabilityController.deleteAvailability);

module.exports = router;