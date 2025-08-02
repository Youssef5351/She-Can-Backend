const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Set CORS headers FIRST!
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    // More robust path resolution for serverless environment
    const filePath = path.join(process.cwd(), 'api', 'data.json');
    
    // Check if file exists before reading
    if (!fs.existsSync(filePath)) {
      console.error('data.json file not found at:', filePath);
      return res.status(500).json({ 
        error: 'Data file not found',
        path: filePath 
      });
    }
    
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    
    // Validate data structure - CHECK FOR LEADERBOARD!
    if (!data || !data.leaderboard) {
      console.error('Invalid data structure in data.json - leaderboard not found');
      return res.status(500).json({ 
        error: 'Invalid data structure - leaderboard not found' 
      });
    }
    
    // Set proper headers
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data.leaderboard);
    
  } catch (error) {
    console.error('Error in leaderboard API:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
