import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DATABASE_URL);  // Debugging step

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // Disable SSL
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
