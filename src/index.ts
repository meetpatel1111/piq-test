import express from 'express';
import { z } from 'zod';
import * as mathUtils from './mathUtils.js';
import * as dataManager from './dataManager.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Root endpoint
app.get('/', (req: express.Request, res: express.Response) => {
  res.json({
    message: 'PipelineIQ Multi-File Test API',
    status: 'online'
  });
});

// Calculate endpoint
app.post('/api/calculate', (req: express.Request, res: express.Response) => {
  const { a, b, operation } = req.body;
  if (operation === 'add') return res.json({ result: mathUtils.add(a, b) });
  if (operation === 'multiply') return res.json({ result: mathUtils.multiply(a, b) });
  res.json({ result: 0 });
});

// Users endpoint (Intentional error in index.ts: missing paren in catch clause)
app.get('/api/users', (req: express.Request, res: express.Response) => {
  try {
    const activeUsers = dataManager.getActiveUsers();
    const summary = dataManager.formatUsersSummary(activeUsers);
    res.json({ summary, count: activeUsers.length });
  } catch (error {
    res.status(500).json({ error: 'InternalServerError', message: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Test API listening at http://localhost:${port}`);
});

export default app;
