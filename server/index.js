// Simple entry point to help debug Railway deployment issues
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    variables: {
      // Mask sensitive values but show if they exist
      MONGO_URI: process.env.MONGO_URI ? '****[EXISTS]****' : 'NOT SET',
      MONGODB_URI: process.env.MONGODB_URI ? '****[EXISTS]****' : 'NOT SET',
      JWT_SECRET: process.env.JWT_SECRET ? '****[EXISTS]****' : 'NOT SET',
      PORT: process.env.PORT || '5000 (default)'
    }
  });
});

// Basic API endpoint with CORS headers
app.get('/api/test', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.status(200).json({ 
    message: 'API is working!',
    cors: 'Enabled with wildcard origin (*)'
  });
});

// Return 200 for OPTIONS preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.status(200).send();
});

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Simple diagnostic server running on port ${PORT}`);
  console.log('Environment variables status:');
  console.log(`- MONGO_URI: ${process.env.MONGO_URI ? 'SET' : 'NOT SET'}`);
  console.log(`- MONGODB_URI: ${process.env.MONGODB_URI ? 'SET' : 'NOT SET'}`);
  console.log(`- JWT_SECRET: ${process.env.JWT_SECRET ? 'SET' : 'NOT SET'}`);
  console.log(`- PORT: ${process.env.PORT || '5000 (default)'}`);
});
