const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/error');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;