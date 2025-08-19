const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentor');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, mentorController.searchMentors);

module.exports = router;