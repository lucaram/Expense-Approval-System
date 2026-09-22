import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './db.js';

import expensesRouter from './routes/expenses.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/expenses', expensesRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});