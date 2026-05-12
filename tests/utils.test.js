const utils = require('../src/utils');

describe('Utility Functions', () => {
  describe('processData', () => {
    test('should process valid data', () => {
      const data = {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ]
      };
      
      const result = utils.processData(data);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('processed', true);
      expect(result[0]).toHaveProperty('timestamp');
    });

    test('should fail with null data', () => {
      expect(() => {
        utils.processData(null);
      }).toThrow();
    });

    test('should fail with undefined data', () => {
      expect(() => {
        utils.processData(undefined);
      }).toThrow();
    });
  });

  describe('calculateMetrics', () => {
    test('should calculate metrics correctly', () => {
      const numbers = [1, 2, 3, 4, 5];
      const result = utils.calculateMetrics(numbers);
      
      expect(result.average).toBe(3);
      expect(result.sum).toBe(15);
      expect(result.count).toBe(5);
      expect(result.min).toBe(1);
      expect(result.max).toBe(5);
    });

    test('should handle empty array', () => {
      expect(() => {
        utils.calculateMetrics([]);
      }).toThrow();
    });
  });

  describe('parseConfig', () => {
    test('should parse valid JSON', () => {
      const configString = '{"name": "test", "version": "1.0.0"}';
      const result = utils.parseConfig(configString);
      
      expect(result).toHaveProperty('name', 'test');
      expect(result).toHaveProperty('version', '1.0.0');
    });

    test('should fail with invalid JSON', () => {
      const invalidJson = '{"name": "test", "version":}';
      
      expect(() => {
        utils.parseConfig(invalidJson);
      }).toThrow('Invalid configuration');
    });
  });

  describe('fetchExternalData', () => {
    test('should fetch data successfully', async () => {
      const result = await utils.fetchExternalData('https://api.example.com/data');
      
      expect(result).toHaveProperty('data', 'Sample data');
      expect(result).toHaveProperty('url', 'https://api.example.com/data');
    });

    test('should handle network failure', async () => {
      await expect(
        utils.fetchExternalData('https://api.example.com/fail')
      ).rejects.toThrow('Network request failed');
    }, 10000);

    test('should handle timeout', async () => {
      await expect(
        utils.fetchExternalData('https://api.example.com/slow', 1000)
      ).rejects.toThrow('Request timeout');
    }, 2000);
  });

  describe('processLargeDataset', () => {
    test('should process reasonable dataset', () => {
      const result = utils.processLargeDataset(1000);
      
      expect(result).toHaveLength(1000);
      expect(result[0]).toHaveProperty('processed', true);
    });

    test('should reject oversized dataset', () => {
      expect(() => {
        utils.processLargeDataset(2000000);
      }).toThrow('Dataset too large for processing');
    });
  });

  describe('validateUser', () => {
    test('should validate valid user', () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
      };
      
      expect(utils.validateUser(user)).toBe(true);
    });

    test('should reject empty name', () => {
      const user = {
        name: '',
        email: 'john@example.com',
        age: 30
      };
      
      expect(() => {
        utils.validateUser(user);
      }).toThrow('User name cannot be empty');
    });

    test('should reject invalid email', () => {
      const user = {
        name: 'John Doe',
        email: 'invalid-email',
        age: 30
      };
      
      expect(() => {
        utils.validateUser(user);
      }).toThrow('Invalid email format');
    });

    test('should reject invalid age', () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 150
      };
      
      expect(() => {
        utils.validateUser(user);
      }).toThrow('Invalid age range');
    });
  });

  describe('findPrimes', () => {
    test('should find primes up to 10', () => {
      const primes = utils.findPrimes(10);
      
      expect(primes).toEqual([2, 3, 5, 7]);
    });

    test('should handle small limit', () => {
      const primes = utils.findPrimes(2);
      
      expect(primes).toEqual([]);
    });
  });

  describe('recursiveFunction', () => {
    test('should handle small depth', () => {
      const result = utils.recursiveFunction(5);
      
      expect(result).toBe(15); // 5 + 4 + 3 + 2 + 1 + 0
    });

    test('should handle zero depth', () => {
      const result = utils.recursiveFunction(0);
      
      expect(result).toBe(0);
    });
  });
});
