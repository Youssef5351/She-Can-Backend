const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
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
    
    // Validate data structure
    if (!data || !data.user) {
      console.error('Invalid data structure in data.json');
      return res.status(500).json({ 
        error: 'Invalid data structure' 
      });
    }
    
    // Set proper headers
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data.user);
    
  } catch (error) {
    console.error('Error in user API:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
