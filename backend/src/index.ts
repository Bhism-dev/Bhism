import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth/auth';
import otpRoutes from './routes/otp/otp';
import { createUserTable } from './schema/user_schema';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Initialize DB table
createUserTable();

// Routes
app.use('/auth', authRoutes);
app.use('/otp', otpRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
