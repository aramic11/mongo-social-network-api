const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(routes);

// Connect to the database
db.once('open', () => {
  console.log('Connected to the database.');

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
});

// Error handling
app.use((req, res) => {
  res.status(404).send('404 Error: Page not found');
});

// Export the app for testing
module.exports = app;
