import express from 'express';
import { z } from 'zod';

const app = express();
const port = process.env.PORT || 3000;
const invalidSyntax = ;

app.use(express.json());

// Root endpoint with info
app.get('/', (req: express.Request, res: express.Response) => {
  res.json({
    message: 'Welcome to the stable PipelineIQ Test API',
    endpoints: {
      health: 'GET /health',
      calculate: 'POST /api/calculate',
      data: 'GET /api/data'
    }
  });
});

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.1.0'
  });
});

// Safe Calculator Endpoint using Zod for validation
app.post('/api/calculate', (req: express.Request, res: express.Response) => {
  try {
    const schema = z.object({
      a: z.number(),
      b: z.number(),
      operation: z.enum(['add', 'subtract', 'multiply', 'divide'])
    });

    const { a, b, operation } = schema.parse(req.body);

    let result = 0;
    switch (operation) {
      case 'add':
        result = a + b;
        break;
      case 'subtract':
        result = a - b;
        break;
      case 'multiply':
        result = a * b;
        break;
      case 'divide':
        if (b === 0) {
          return res.status(400).json({ 
            error: 'ValidationError', 
            message: 'Division by zero is not allowed' 
          });
        }
        result = a / b;
        break;
    }

    res.json({ result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'ValidationError', details: error.issues });
    }
    res.status(500).json({ error: 'InternalServerError', message: (error as Error).message });
  }
});

// Database Data simulation (Stable by default, can be simulated)
app.get('/api/data', (req: express.Request, res: express.Response) => {
  const isDbDown = process.env.SIMULATE_DB_FAILURE === 'true';
  
  if (isDbDown) {
    return res.status(503).json({ 
      error: 'ServiceUnavailable', 
      message: 'Failed to connect to the primary database cluster' 
    });
  }

  res.json({ 
    data: ['stable-item1', 'stable-item2', 'stable-item3'], 
    source: 'database',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Stable Test API listening at http://localhost:${port}`);
});

export default app;
