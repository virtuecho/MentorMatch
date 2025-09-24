const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/role');
const mentorRoutes = require('./routes/mentor');
const availabilityRoutes = require('./routes/availability');
const bookingRoutes = require('./routes/booking');

const errorHandler = require('./middleware/error');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/role', roleRoutes)
app.use('/mentor', mentorRoutes);
app.use('/availability', availabilityRoutes);
app.use('/booking', bookingRoutes);

// Confirm backend API
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API is live' });
});

// Error handler
app.use(errorHandler);

module.exports = app;