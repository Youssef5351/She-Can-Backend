const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'GET') {
    try {
      const dataPath = path.join(process.cwd(), 'data.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      res.status(200).json(data.leaderboard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
