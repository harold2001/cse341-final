import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 8080;
export const MONGO_DB_URI = process.env.MONGO_DB_URI;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;
export const ENV = process.env.ENV || 'development';
export const DOMAIN = process.env.DOMAIN || 'http://localhost:3001';
export const CORS_ALLOWED = [
  'http://127.0.0.1:5500',
  'http://localhost:3001',
  `https://${DOMAIN}`,
  '*',
];
