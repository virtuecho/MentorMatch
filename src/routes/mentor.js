const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentor');
const { authenticate } = require('../middleware/auth');

router.get('/recommend', authenticate, mentorController.recommendMentors);

router.get('/search', authenticate, mentorController.searchMentors);

router.get('/:mentorId', authenticate, mentorController.getMentorProfile);

module.exports = router;