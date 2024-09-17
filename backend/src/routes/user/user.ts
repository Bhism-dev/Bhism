import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

import { fetchUserByToken, deleteUserByToken, updateUserByToken } from "../../schema/user_schema";

const router = express.Router();

// Import the user schema
router.get('/profile/:token', async (req, res) => {
  const token = req.params.token;
  try {
    const user = await fetchUserByToken(token);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/profile', async (req, res) => {
  const token = req.body;
  try {
    await deleteUserByToken(token);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
);

router.put('/profile', async (req, res) => {
  const token = req.body;
  const { first_name, last_name, phone, email } = req.body;
  try {
    const user = await updateUserByToken(token, first_name, last_name, phone, email);
    res.status(200).json("User updated successfully");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;