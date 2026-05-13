import { describe, it, expect, vi } from 'vitest';
import app from '../src/index';
import request from 'supertest';

describe('Unstable API Endpoints', () => {
  it('should pass health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  describe('Calculator API', () => {
    it('should add numbers correctly', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ a: 10, b: 5, operation: 'add' });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(15);
    });

    it('should fail on division by zero', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ a: 10, b: 0, operation: 'divide' });
      
      // Intentional failure test case
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Error');
      expect(response.body.message).toContain('DivisionByZero');
    });

    it('should fail on invalid operation', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ a: 10, b: 5, operation: 'modulus' });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
    });
  });

  describe('Data API', () => {
    it('should return data when DB is up', async () => {
      const response = await request(app).get('/api/data');
      expect(response.status).toBe(200);
    });

    it('should fail when DB failure is simulated', async () => {
      process.env.SIMULATE_DB_FAILURE = 'true';
      const response = await request(app).get('/api/data');
      
      expect(response.status).toBe(503);
      expect(response.body.error).toBe('ServiceUnavailable');
      
      // Cleanup
      delete process.env.SIMULATE_DB_FAILURE;
    });
  });
});
