// This test file is designed to fail to test PipelineIQ integration
const utils = require('../src/utils');

describe('Failing Tests for PipelineIQ Testing', () => {
  describe('Intentional Failures', () => {
    test('should fail with null reference', () => {
      const nullObject = null;
      // This will definitely fail
      expect(nullObject.someProperty).toBe('value');
    });

    test('should fail with undefined method', () => {
      const obj = {};
      // This will definitely fail
      expect(obj.nonExistentMethod()).toBeDefined();
    });

    test('should fail with assertion error', () => {
      const result = 2 + 2;
      // This will definitely fail
      expect(result).toBe(5);
    });

    test('should fail with timeout error', (done) => {
      // This will definitely fail due to timeout
      setTimeout(() => {
        done();
      }, 10000);
    }, 1000);

    test('should fail with type error', () => {
      const number = 42;
      // This will definitely fail
      expect(number.toUpperCase()).toBe('42');
    });

    test('should fail with array out of bounds', () => {
      const arr = [1, 2, 3];
      // This will definitely fail
      expect(arr[10]).toBeDefined();
    });

    test('should fail with object property error', () => {
      const obj = { name: 'test' };
      // This will definitely fail
      expect(obj.age).toBeGreaterThan(0);
    });

    test('should fail with regex match error', () => {
      const email = 'invalid-email';
      // This will definitely fail
      expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    test('should fail with async error', async () => {
      // This will definitely fail
      await utils.fetchExternalData('https://non-existent-url.com');
    });

    test('should fail with division by zero', () => {
      const result = 10 / 0;
      // This will definitely fail
      expect(result).toBe(0);
    });

    test('should fail with JSON parsing error', () => {
      const invalidJson = '{ invalid json }';
      // This will definitely fail
      expect(() => JSON.parse(invalidJson)).not.toThrow();
    });

    test('should fail with memory error', () => {
      // This will definitely fail with memory issues
      const hugeArray = new Array(1000000).fill(0).map(() => ({ data: new Array(1000).fill(0) }));
      expect(hugeArray.length).toBeGreaterThan(0);
    });

    test('should fail with stack overflow', () => {
      // This will definitely fail with stack overflow
      function recursive() {
        recursive();
      }
      expect(() => recursive()).not.toThrow();
    });

    test('should fail with promise rejection', async () => {
      // This will definitely fail
      await Promise.reject(new Error('Intentional rejection'));
    });

    test('should fail with file system error', () => {
      // This will definitely fail
      const fs = require('fs');
      expect(fs.readFileSync('/non-existent-file.txt')).toBeDefined();
    });

    test('should fail with network error', async () => {
      // This will definitely fail
      const axios = require('axios');
      await axios.get('https://non-existent-domain-12345.com');
    });

    test('should fail with database connection error', async () => {
      // This will definitely fail
      const mongoose = require('mongoose');
      await mongoose.connect('mongodb://invalid-connection-string');
    });

    test('should fail with authentication error', () => {
      // This will definitely fail
      const token = 'invalid-token';
      expect(token).toBe('valid-token');
    });

    test('should fail with permission error', () => {
      // This will definitely fail
      const fs = require('fs');
      fs.writeFileSync('/root/test-file', 'test');
    });

    test('should fail with validation error', () => {
      // This will definitely fail
      const user = { name: '', email: 'invalid', age: -1 };
      utils.validateUser(user);
    });

    test('should fail with configuration error', () => {
      // This will definitely fail
      const config = utils.parseConfig('invalid config string');
      expect(config).toHaveProperty('database');
    });

    test('should fail with calculation error', () => {
      // This will definitely fail
      const metrics = utils.calculateMetrics([]);
      expect(metrics.average).toBeGreaterThan(0);
    });

    test('should fail with processing error', () => {
      // This will definitely fail
      const result = utils.processData(null);
      expect(result).toHaveLength(5);
    });

    test('should fail with dataset error', () => {
      // This will definitely fail
      const dataset = utils.processLargeDataset(2000000);
      expect(dataset).toHaveLength(2000000);
    });

    test('should fail with prime calculation error', () => {
      // This will definitely fail
      const primes = utils.findPrimes(-100);
      expect(primes.length).toBeGreaterThan(0);
    });

    test('should fail with recursive error', () => {
      // This will definitely fail
      const result = utils.recursiveFunction(100000);
      expect(result).toBeFinite();
    });
  });
});
