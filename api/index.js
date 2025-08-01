const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());

const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

app.get('/api/user', (req, res) => {
  res.json(data.user);
});

app.get('/api/leaderboard', (req, res) => {
  res.json(data.leaderboard);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
