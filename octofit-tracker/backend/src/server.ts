import app from './index';
import { connectDatabase, MONGO_URI } from './config/database';
import { Request, Response } from 'express';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_URL = process.env.API_URL || (CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker backend is running.',
    apiUrl: API_URL,
    mongoUri: MONGO_URI,
  });
});

connectDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    console.log(`API URL: ${API_URL}`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
