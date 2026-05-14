const _ = require('lodash');

/**
 * Utility functions for the test application
 */

// Function that might fail with null/undefined values
function processData(data) {
  // This will fail if data is null or undefined
  return data.items.map(item => ({
    ...item,
    processed: true,
    timestamp: new Date().toISOString()
  }));
}

// Function with potential division by zero
function calculateMetrics(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const count = numbers.length;
  
  // This will fail if count is 0
  return {
    average: sum / count,
    sum: sum,
    count: count,
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };
}

// Function with JSON parsing that might fail
function parseConfig(configString) {
  try {
    return JSON.parse(configString);
  } catch (error) {
    throw new Error(`Invalid configuration: ${error.message}`);
  }
}

// Function with async operations that might timeout
async function fetchExternalData(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Request timeout after ${timeout}ms`));
    }, timeout);
    
    // Simulate network request
    setTimeout(() => {
      clearTimeout(timer);
      if (url.includes('fail')) {
        reject(new Error('Network request failed'));
      } else {
        resolve({ data: 'Sample data', url: url });
      }
    }, 1000);
  });
}

// Function with potential memory issues
function processLargeDataset(size) {
  if (size > 1000000) {
    throw new Error('Dataset too large for processing');
  }
  
  // This might cause memory issues with very large datasets
  const dataset = new Array(size).fill(0).map((_, index) => ({
    id: index,
    value: Math.random() * 100,
    processed: false
  }));
  
  return dataset.map(item => ({
    ...item,
    processed: true,
    checksum: _.checksum(item)
  }));
}

// Function with potential type errors
function validateUser(user) {
  // This will fail if user is not an object
  if (user.name.trim() === '') {
    throw new Error('User name cannot be empty');
  }
  
  if (!user.email.includes('@')) {
    throw new Error('Invalid email format');
  }
  
  if (user.age < 0 || user.age > 120) {
    throw new Error('Invalid age range');
  }
  
  return true;
}

// Function with potential infinite loop
function findPrimes(limit) {
  const primes = [];
  
  for (let num = 2; num < limit; num++) {
    let isPrime = true;
    
    // This could be slow for large limits
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    
    if (isPrime) {
      primes.push(num);
    }
  }
  
  return primes;
}

// Function with potential stack overflow
function recursiveFunction(depth) {
  if (depth <= 0) {
    return 0;
  }
  
  // This will cause stack overflow for large depths
  return depth + recursiveFunction(depth - 1);
}

// Function that will fail if metadata is missing
function transformObject(obj) {
  return {
    id: obj.id,
    name: obj.name.toUpperCase(),
    tags: obj.metadata.tags.map(t => t.toLowerCase())
  };
}

// Function that simulates an external API rate limit (HTTP 429)
async function callExternalApiWithRateLimit(retryCount = 0) {
  if (retryCount < 3) {
    const error = new Error('Too Many Requests');
    error.status = 429;
    error.headers = { 'retry-after': '30' };
    throw error;
  }
  return { success: true, data: 'Final success after retries' };
}

// Function that simulates a filesystem permission error (Platform Agnostic)
function writeSystemLog(path, content) {
  const isProtectedPath = 
    path.startsWith('/etc') || 
    path.startsWith('/root') || 
    path.startsWith('/var/log') ||
    path.startsWith('C:\\Windows') || 
    path.startsWith('C:\\Program Files');

  if (isProtectedPath) {
    const error = new Error(`EACCES: permission denied, open '${path}'`);
    error.code = 'EACCES';
    error.errno = -13;
    throw error;
  }
  return `Log written to ${path}`;
}

// Function that causes a circular reference error during JSON serialization
function serializeConfig(config) {
  const circular = { name: 'circular' };
  circular.self = circular;
  
  // This will throw "Converting circular structure to JSON"
  return JSON.stringify(circular);
}

// Function that simulates a dependency injection failure
function initializeService(config) {
  if (!config || !config.apiKey) {
    throw new Error('ServiceInitializationError: Missing required API key in configuration. Check your environment variables.');
  }
  return { initialized: true };
}

export {
  processData,
  calculateMetrics,
  parseConfig,
  fetchExternalData,
  processLargeDataset,
  validateUser,
  findPrimes,
  recursiveFunction,
  transformObject,
  callExternalApiWithRateLimit,
  writeSystemLog,
  serializeConfig,
  initializeService
};
