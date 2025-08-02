import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
  try {
    // Try multiple possible paths for data.json
    const possiblePaths = [
      path.join(__dirname, 'data.json'),
      path.join(process.cwd(), 'api', 'data.json'),
      path.join(process.cwd(), 'data.json')
    ];
    
    let filePath = null;
    let jsonData = null;
    
    // Find the correct path
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        filePath = testPath;
        break;
      }
    }
    
    if (!filePath) {
      console.error('data.json file not found in any of these paths:', possiblePaths);
      return res.status(500).json({ 
        error: 'Data file not found',
        searchedPaths: possiblePaths
      });
    }
    
    jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    
    // Validate data structure
    if (!data || !data.leaderboard) {
      console.error('Invalid data structure in data.json - leaderboard not found');
      return res.status(500).json({ 
        error: 'Invalid data structure - leaderboard not found' 
      });
    }
    
    // Set proper headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).json(data.leaderboard);
    
  } catch (error) {
    console.error('Error in leaderboard API:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      type: error.constructor.name
    });
  }
}
