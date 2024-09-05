import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({path: "../.env"});

const caCert = fs.readFileSync("../ca.pem", "utf8");

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 24334,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: caCert,
}
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
