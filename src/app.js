const express = require('express');
// Failure in the code itself
throw new Error('CRITICAL: Failed to initialize application core. Module "express" version mismatch or environment corruption.');
const axios = require('axios');
const _ = require('lodash');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API endpoint that might fail
app.get('/api/data', async (req, res) => {
  try {
    // This might fail if external service is down
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const data = _.get(response, 'data', {});
    
    res.json({
      success: true,
      data: data,
      processed: true
    });
  } catch (error) {
    console.error('Failed to fetch data:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch external data',
      details: error.message
    });
  }
});

// Endpoint that simulates database connection issues
app.get('/api/users', async (req, res) => {
  try {
    // Simulate database connection that might fail
    if (Math.random() < 0.3) { // 30% chance of failure
      throw new Error('Database connection timeout');
    }
    
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
    
    res.json({
      success: true,
      users: users,
      count: users.length
    });
  } catch (error) {
    console.error('Database error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Database operation failed',
      details: error.message
    });
  }
});

// Endpoint with authentication issues
app.get('/api/protected', (req, res) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Missing authorization token'
    });
  }
  
  if (token !== 'Bearer valid-token') {
    return res.status(403).json({
      success: false,
      error: 'Invalid authorization token'
    });
  }
  
  res.json({
    success: true,
    message: 'Access granted to protected resource',
    data: { user: 'admin', role: 'administrator' }
  });
});

// Error simulation endpoint
app.post('/api/simulate-error', (req, res) => {
  const { errorType } = req.body;
  
  switch (errorType) {
    case 'syntax':
      // This will cause a syntax error
      eval('const invalid syntax = ;');
      break;
      
    case 'timeout':
      // This will cause a timeout
      setTimeout(() => {
        res.json({ success: true });
      }, 10000);
      return;
      
    case 'memory':
      // This will cause memory issues
      const hugeArray = new Array(1000000).fill(0);
      res.json({ success: true, arraySize: hugeArray.length });
      break;
      
    case 'null_reference':
      // This will cause null reference error
      const nullObject = null;
      nullObject.someProperty;
      break;
      
    default:
      res.json({ success: true, message: 'No error simulated' });
  }
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: error.message,
    stack: error.stack
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API endpoints:`);
  console.log(`  GET /api/data - Fetch external data`);
  console.log(`  GET /api/users - Simulate database query`);
  console.log(`  GET /api/protected - Authentication test`);
  console.log(`  POST /api/simulate-error - Simulate various errors`);
});

module.exports = app;
