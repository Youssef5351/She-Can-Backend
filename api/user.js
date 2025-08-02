const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.status(200).json(data.user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read user data', details: error.message });
  }
};
