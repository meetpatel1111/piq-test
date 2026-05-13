import express from 'express';
import { z } from 'zod';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Health check - always passes
app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Calculator endpoint - intentionally fragile for testing RCA
app.post('/api/calculate', (req: express.Request, res: express.Response) => {
  try {
    const schema = z.object({
      a: z.number(),
      b: z.number(),
      operation: z.enum(['add', 'subtract', 'multiply', 'divide'])
    });

    const { a, b, operation } = schema.parse(req.body);

    if (operation === 'divide' && b === 0) {
      throw new Error('DivisionByZero: Cannot divide by zero in standard mathematics');
    }

    let result = 0;
    switch (operation) {
      case 'add': result = a + b; break;
      case 'subtract': result = a - b; break;
      case 'multiply': result = a * b; break;
      case 'divide': result = a / b; break;
    }

    res.json({ result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'ValidationError', details: error.errors });
    }
    res.status(500).json({ error: (error as Error).name, message: (error as Error).message });
  }
});

// Database endpoint - simulates transient infrastructure failures
app.get('/api/data', (req: express.Request, res: express.Response) => {
  const isDbDown = process.env.SIMULATE_DB_FAILURE === 'true';
  
  if (isDbDown) {
    return res.status(503).json({ 
      error: 'ServiceUnavailable', 
      message: 'Failed to connect to the primary database cluster in us-east-1' 
    });
  }

  res.json({ data: ['item1', 'item2', 'item3'], source: 'database' });
});

app.listen(port, () => {
  console.log(`Unstable Test API listening at http://localhost:${port}`);
});

export default app;
