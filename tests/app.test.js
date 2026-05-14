import request from 'supertest';
import app from '../src/app.js';
import * as utils from '../src/utils.js';
import { describe, test, expect } from 'vitest';

describe('Application Tests', () => {
  test('GET /health should return 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('GET /api/data should return success', async () => {
    const response = await request(app).get('/api/data');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('Deliberate Failure: Regression in Data Processing', async () => {
    // This test is designed to fail to verify PipelineIQ's diagnostic capabilities
    const sampleData = {
      id: "PIQ-123",
      name: "Test Object",
      // metadata: { tags: ["test"] } // Intentionally missing 'metadata' to trigger transformObject failure
    };
    
    // We expect this to throw since metadata is missing
    expect(() => utils.transformObject(sampleData)).toThrow();
  });

  describe('Failure Lab Tests', () => {
    test('Rate Limit Failure (429)', async () => {
      const response = await request(app).get('/api/failure-lab?type=rate_limit');
      expect(response.statusCode).toBe(429);
      expect(response.body.message).toBe('Too Many Requests');
    });

    test('Filesystem Permission Failure (EACCES)', async () => {
      const response = await request(app).get('/api/failure-lab?type=permission');
      expect(response.statusCode).toBe(500);
      expect(response.body.code).toBe('EACCES');
    });

    test('Circular Reference Failure (TypeError)', async () => {
      const response = await request(app).get('/api/failure-lab?type=circular');
      expect(response.statusCode).toBe(500);
      expect(response.body.message).toContain('circular');
    });

    test('Initialization Failure (ServiceInitializationError)', async () => {
      const response = await request(app).get('/api/failure-lab?type=init');
      expect(response.statusCode).toBe(500);
      expect(response.body.message).toContain('Missing required API key');
    });

    test('Memory Leak Simulation', async () => {
      const response = await request(app).get('/api/leak?size=100');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Memory leaked successfully');
    });

    test('Environment Mismatch: Incorrect API configuration', () => {
      const badConfig = { endpoint: 'https://api.internal/v1' }; // missing apiKey
      
      try {
        utils.initializeService(badConfig);
        throw new Error('Should have failed');
      } catch (error) {
        expect(error.message).toContain('ServiceInitializationError');
      }
    });
  });
});
