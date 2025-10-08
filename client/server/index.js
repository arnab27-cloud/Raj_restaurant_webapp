// server/index.js
const express = require('express');
const path = require('path');
const app = express(); // ✅ This defines 'app'

const PORT = process.env.PORT || 5000;

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../build')));

// API routes (example)
app.get('/api/menu', (req, res) => {
  res.json([
    { name: 'Green Peas Kachuri', price: 80 },
    { name: 'Bengali Thali', price: 150 }
  ]);
});

// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});