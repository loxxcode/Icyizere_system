const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// IMPORTANT: Apply CORS middleware before any other middleware or routes
// Use the dedicated CORS middleware
const applyCorsMw = require('./middleware/cors');
applyCorsMw(app);

// Middleware configuration

app.use(express.json());
app.use(morgan('dev'));

// Import routes
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const supplierRoutes = require('./routes/supplier.routes');
const stockInRoutes = require('./routes/stockIn.routes');
const stockOutRoutes = require('./routes/stockOut.routes');
const reportRoutes = require('./routes/report.routes');

// Routes middleware
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/stock-in', stockInRoutes);
app.use('/api/stock-out', stockOutRoutes);
app.use('/api/reports', reportRoutes);

// Error handling for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// MongoDB Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MongoDB Atlas connection string (MONGO_URI) is not defined in .env file');
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    });
    
    console.log('✅ MongoDB Atlas connected successfully');
    console.log(`📊 Using database: ${mongoose.connection.db.databaseName}`);
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\nPlease make sure:');
    console.log('1. Your internet connection is stable');
    console.log('2. Your IP is whitelisted in MongoDB Atlas');
    console.log('3. Your MongoDB Atlas credentials in .env are correct');
    console.log('4. The database name in the connection string is correct');
    // Don't exit process on connection error to allow debugging
    console.error('Full error details:', error);
  }
};

// Execute the database connection
connectDB();

// Serve static assets in both production and development modes
// For production, serve from build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
} else {
  // For development, serve static files from client/public
  app.use('/assets', express.static(path.join(__dirname, '../client/public/assets')));
}

// Port configuration
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB URI: ${process.env.MONGO_URI ? '****' + process.env.MONGO_URI.slice(-10) : 'NOT SET'}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});
