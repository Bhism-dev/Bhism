import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;

export { port, dbUrl, jwtSecret };