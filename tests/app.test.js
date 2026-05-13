const request = require('supertest');
const app = require('../src/app');

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
    
    const utils = require('../src/utils');
    const result = utils.transformObject(sampleData);
    
    expect(result.id).toBe("PIQ-123");
  });
});
