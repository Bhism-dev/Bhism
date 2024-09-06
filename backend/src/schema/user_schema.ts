import { query } from '../config/db_config';

// Create a new user table if it doesn't exist
export const createUserTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      phone VARCHAR(15),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(100),
      abhaid VARCHAR(100),
      token TEXT,
      otp VARCHAR(6)
    );
  `;
  await query(createTableQuery);
};

// Insert a new user into the table
export const insertUser = async (firstName: string, lastName: string, phone: string, email: string, password: string, abhaid: string) => {
  const insertQuery = `
    INSERT INTO users (first_name, last_name, phone, email, password, abhaid) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
  `;
  const values = [firstName, lastName, phone, email, password, abhaid];
  const result = await query(insertQuery, values);
  return result.rows[0];
};

// Find user by email
export const findUserByEmail = async (email: string) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

// Update user OTP Email
export const updateUserOTPEmail = async (email: string, otp: string) => {
  const result = await query('UPDATE users SET otp = $1 WHERE email = $2 RETURNING *', [otp, email]);
  return result.rows[0];
};

// Find otp by email
export const findOTPByEmail = async (email: string) => {
  const result = await query('SELECT otp FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

// Update user OTP Phone
export const updateUserOTPPhone = async (phone: string, otp: string) => {
  const result = await query('UPDATE users SET otp = $1 WHERE phone = $2 RETURNING *', [otp, phone]);
  return result.rows[0];
};

// Find otp by phone
export const findOTPByPhone = async (phone: string) => {
  const result = await query('SELECT otp FROM users WHERE phone = $1', [phone]);
  return result.rows[0];
};


// Update token
export const updateUserToken = async (email: string, token: string) => {
  const result = await query('UPDATE users SET token = $1 WHERE email = $2 RETURNING *', [token, email]);
  return result.rows[0];
};
