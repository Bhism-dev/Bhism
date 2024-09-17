import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

import { allDoctors, addDoctor, deleteDoctor, updateDoctor } from "../../schema/doctor_schema";

const router = express.Router();

// fetch doctors to display in frontend to the user
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await allDoctors();
        res.status(200).json(doctors);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
);

// insert doctor
router.post('/doctors', async (req, res) => {
    const body = req.body;
    try {
        const doctor: any = await addDoctor(body);
        res.status(201).json({ message: 'Doctor inserted successfully', body });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update doctors
router.put('/doctors/:id', async (req, res) => {
    try {
        // const {qualification, designation, facility_posted, postal_address, contact_number, district, id} = req.body
        // const updatedDoctor: any = await updateDoctor(qualification, designation, facility_posted, postal_address, contact_number, district, id);
        const body = req.body;
        const id = Number(req.params.id);
        const updateDoctorDate: any = await updateDoctor(body, id);
        res.status(200).json("Doctor updated successfully");
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// delete Doctors
router.delete('/doctors/:id', async (req, res) => {
    const id = Number(req.params.id); // Convert id to a number
    try {
        await deleteDoctor(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
);

export default router;