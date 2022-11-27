import type { Express, Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';

import { initIncidentService } from './incident';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

initIncidentService(app)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
