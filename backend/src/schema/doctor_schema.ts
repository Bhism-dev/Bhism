import { query } from '../config/db_config';

export const allDoctors = async () => {
    const result = await query('SELECT * FROM doctors');
    return result.rows;
};

export const addDoctor = async (doctor: any) => {
    const insertQuery = ` INSERT
    INTO doctors (state, district, name, qualification, designation, facility_posted, postal_address, contact_number, availability, registration_year, experience) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
    `;
    const values = [doctor.state, doctor.district, doctor.name, doctor.qualification, doctor.designation, doctor.facility_posted, doctor.postal_address, doctor.contact_number, doctor.availability, doctor.registration_year, doctor.experience];
    const result = await query(insertQuery, values);
    return result.rows[0];
}

//designation: string, facility_posted: string, postal_address: string, contact_number: string, district: string, id
export const updateDoctor = async(doctor:any, id:number) => {
    let updateQuery = 'UPDATE doctors SET';
    const values = [];
    let index = 1;

    if (doctor.qualification) {
        updateQuery += ` qualification = $${index},`;
        values.push(doctor.qualification);
        index++;
    }
    
    if (doctor.designation) {
        updateQuery += ` designation = $${index},`;
        values.push(doctor.designation);
        index++;
    }
    if (doctor.facility_posted) {
        updateQuery += ` facility_posted = $${index},`;
        values.push(doctor.facility_posted);
        index++;
    }
    if (doctor.postal_address) {
        updateQuery += ` postal_address = $${index},`;
        values.push(doctor.postal_address);
        index++;
    }
    if (doctor.contact_number) {
        updateQuery += ` contact_number = $${index},`;
        values.push(doctor.contact_number);
        index++;
    }
    if (doctor.district) {
        updateQuery += ` district = $${index},`;
        values.push(doctor.district);
        index++;
    }

    // Remove the trailing comma
    updateQuery = updateQuery.slice(0, -1);

    updateQuery += ` WHERE id = $${index} RETURNING *`;
    values.push(id);

    const result = await query(updateQuery, values);
    return result.rows[0];
}


export const deleteDoctor = async (doctorID: number) => {
    await query('DELETE FROM doctors WHERE id = $1', [doctorID]);
};