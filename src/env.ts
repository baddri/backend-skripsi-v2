import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || 'localhost',
  db: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 27017,
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME,
  },
};
