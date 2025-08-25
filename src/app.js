const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/role')
const mentorRoutes = require('./routes/mentor');

const errorHandler = require('./middleware/error');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/role', roleRoutes)
app.use('/mentor', mentorRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;