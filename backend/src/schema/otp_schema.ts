import { query } from "../config/db_config";

export const createOtpTable = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS otp_requests (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(15),
    email VARCHAR(255),
    otp_code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    CONSTRAINT chk_contact CHECK (phone_number IS NOT NULL OR email IS NOT NULL)
);
`;
    await query(createTableQuery);
}

// Insert a new OTP request into the table
export const insertOtpRequest = async (contact: { phone?: string; email?: string; }, otp: string, expiresAt: Date) => {
    const insertQuery = `
    INSERT INTO otp_requests (phone_number, email, otp_code, expires_at)
    VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [contact.phone || null, contact.email || null, otp, expiresAt];
    const result = await query(insertQuery, values);
    return result.rows[0];
};

// Validate OTP request by phone or email
export const validateOtpRequest = async (contact: { phone?: string; email?: string; }, otp: string) => {
    const queryText = 'SELECT * FROM otp_requests WHERE (phone_number = $1 OR email = $2) AND otp_code = $3 AND expires_at > NOW() AND is_verified = FALSE';
    const values = [contact.phone || null, contact.email || null, otp];
    const result = await query(queryText, values);
    return result.rows[0];
};

const deleteExpiredOtps = async (): Promise<void> => {
    await query(`DELETE FROM otp_requests WHERE expires_at <= NOW()`);
};

// Schedule cleanup every hour
setInterval(deleteExpiredOtps, 60 * 60 * 1000); // Runs every 1 hour
