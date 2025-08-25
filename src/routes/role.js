const express = require('express');
const router = express.Router();
const { changeRole } = require('../controllers/role');
const { authenticate } = require('../middleware/auth');

// Role change route
router.post('/update', authenticate, changeRole);

module.exports = router;