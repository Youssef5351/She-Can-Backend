const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'GET') {
    try {
      // Use absolute path from project root
      const dataPath = path.join(process.cwd(), 'data.json');
      console.log('Looking for data.json at:', dataPath);
      
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      res.status(200).json(data.user);
    } catch (error) {
      console.error('Error reading data:', error);
      res.status(500).json({ 
        error: 'Failed to read data', 
        details: error.message,
        path: path.join(process.cwd(), 'data.json')
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
