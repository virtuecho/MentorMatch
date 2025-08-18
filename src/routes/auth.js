const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Authentication routes
router.post('/register', authController.register);

module.exports = router;