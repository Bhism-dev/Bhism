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

// Find user by phone
export const findUserByPhone = async (phone: string) => {
  const result = await query('SELECT * FROM users WHERE phone = $1', [phone]);
  return result.rows[0];
};

// resetPassword
export const resetPassword = async (contact: { phone?: string; email?: string; }, password: string) => {
  const queryText = 'UPDATE users SET password = $1 WHERE phone = $2 OR email = $3 RETURNING *';
  const values = [password, contact.phone || null, contact.email || null];
  const result = await query(queryText, values);
  return result.rows[0];
};

// Update token
export const updateUserToken = async (phone: string, token: string) => {
  const result = await query('UPDATE users SET token = $1 WHERE phone = $2 RETURNING *', [token, phone]);
  return result.rows[0];
};

// fetch user by token
export const fetchUserByToken = async (token: string) => {
  const result = await query('SELECT first_name, last_name, phone, email, abhaid FROM users WHERE token = $1', [token]);
  return result.rows[0];
};

// delete user by token
export const deleteUserByToken = async (token: string) => {
  await query('DELETE FROM users WHERE token = $1', [token]);
};

// update user by token
export const updateUserByToken = async (token: string, firstName: string, lastName: string, phone: string, email: string) => {
  let updateQuery = 'UPDATE users SET';
  const values = [];
  let index = 1;

  if (firstName) {
    updateQuery += ` first_name = $${index},`;
    values.push(firstName);
    index++;
  }

  if (lastName) {
    updateQuery += ` last_name = $${index},`;
    values.push(lastName);
    index++;
  }

  if (phone) {
    updateQuery += ` phone = $${index},`;
    values.push(phone);
    index++;
  }

  if (email) {
    updateQuery += ` email = $${index},`;
    values.push(email);
    index++;
  }

  // Remove the trailing comma
  updateQuery = updateQuery.slice(0, -1);

  updateQuery += ` WHERE token = $${index} RETURNING *`;
  values.push(token);

  const result = await query(updateQuery, values);
  return result.rows[0];
};