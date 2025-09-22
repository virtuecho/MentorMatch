const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { authenticate } = require('../middleware/auth');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticate, authController.getProfile)
router.put('/profile', authenticate, authController.updateProfile);
router.get('/mentor/:mentorId', authController.getMentorPublicProfile);

module.exports = router;