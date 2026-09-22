import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import './db.js';
import expensesRouter from './routes/expenses.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openApiPath = path.join(__dirname, '../openapi.yaml');
const openApiDocument = YAML.parse(
  fs.readFileSync(openApiPath, 'utf8')
);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument)
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/expenses', expensesRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});