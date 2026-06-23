import mongoose from 'mongoose';

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
export const CODESPACE_NAME = process.env.CODESPACE_NAME;
export const API_URL = process.env.API_URL || (CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000');

export function connectDatabase() {
  return mongoose.connect(MONGO_URI);
}
