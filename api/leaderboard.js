const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(__dirname, 'data.json'); // ⬅️ No "../"
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.status(200).json(data.leaderboard);
};
