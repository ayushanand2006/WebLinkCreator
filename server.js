import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DATA_FILE_PATH = path.resolve(__dirname, 'mainServer.json');

// Increase payload size limit
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://web-link-creator.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Ensure data file exists
const ensureDataFile = () => {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    const initialData = {
      team: [],
      orders: []
    };
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(initialData, null, 2));
  }
};

// Initialize data file
ensureDataFile();

// API to get all website data
app.get('/api/websiteData', (req, res) => {
  console.log('GET /api/websiteData request received.');
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading data from file:', error);
    res.status(500).json({ message: 'Error reading website data' });
  }
});

// API to update website data
app.post('/api/websiteData', (req, res) => {
  console.log('POST /api/websiteData request received.');
  try {
    const newData = req.body;
    // Ensure the data structure is correct
    if (!newData.team) newData.team = [];
    if (!newData.orders) newData.orders = [];
    
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(newData, null, 2));
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error writing data to file:', error);
    res.status(500).json({ message: 'Error writing website data' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 