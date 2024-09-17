import { query } from '../config/db_config';

export const allDoctors = async () => {
    const result = await query('SELECT * FROM doctors');
    return result.rows;
};