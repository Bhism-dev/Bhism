import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { insertUser, findUserByEmail, updateUserToken } from '../../schema/user_schema';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, phone, email, password, abhaid } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await insertUser(firstName, lastName, phone, email, hashedPassword, abhaid);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err: any) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

// Signin route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    await updateUserToken(email, token);
    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ message: 'Error signing in', error: err.message });
  }
});

// Signout route
router.post('/signout', (req, res) => {
  res.json({ message: 'User signed out' });
});

// Refresh token route
router.post('/refresh-token', (req, res) => {
  // Token refresh logic
  res.json({ message: 'Token refreshed' });
});

// Verify token route
router.get('/verify-token', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    res.json({ message: 'Token is valid' });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  
});

// Reset password
router.post('/reset-password', async (req, res) => {
  // Logic for resetting password with OTP
  res.json({ message: 'Password reset successful' });
});

export default router;
