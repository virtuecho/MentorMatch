require('dotenv').config();
const app = require('./app');
const { startCleanupScheduler } = require('./scheduler'); // Import scheduler
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Start the cleanup scheduler
startCleanupScheduler();