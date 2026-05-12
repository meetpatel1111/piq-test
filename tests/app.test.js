const request = require('supertest');
const app = require('../src/app');

describe('Application Tests', () => {
  describe('Health Check', () => {
    test('should return healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('version', '1.0.0');
    });
  });

  describe('API Endpoints', () => {
    test('should fetch data successfully', async () => {
      const response = await request(app)
        .get('/api/data')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('processed', true);
    });

    test('should handle users endpoint', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('users');
      expect(response.body.users).toBeInstanceOf(Array);
    });

    test('should reject unauthorized access', async () => {
      const response = await request(app)
        .get('/api/protected')
        .expect(401);
      
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Missing authorization token');
    });

    test('should grant access with valid token', async () => {
      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Access granted to protected resource');
    });

    test('should reject invalid token', async () => {
      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', 'Bearer invalid-token')
        .expect(403);
      
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Invalid authorization token');
    });
  });

  describe('Error Simulation', () => {
    test('should handle no error simulation', async () => {
      const response = await request(app)
        .post('/api/simulate-error')
        .send({ errorType: 'none' })
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
    });
  });
});
