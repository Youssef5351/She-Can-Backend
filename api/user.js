const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data.json'), 'utf-8'));
  res.status(200).json(data.user);
};
