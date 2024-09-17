import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth/auth';
import otpRoutes from './routes/otp/otp';
import userRoute from './routes/user/user';
import doctorsRoute from './routes/doctors/doctors';
import { createUserTable } from './schema/user_schema';
import { createOtpTable } from './schema/otp_schema';
import cors from 'cors';


dotenv.config({ path: "../.env" });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Initialize DB table
createUserTable();
createOtpTable();

// Routes
app.use('/auth', authRoutes);
app.use('/otp', otpRoutes);
app.use('/user', userRoute);
app.use('/doctors', doctorsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
