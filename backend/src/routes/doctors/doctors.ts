import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

import { allDoctors } from "../../schema/doctor_schema";

const router = express.Router();

router.get('/doctors', async (req, res) => {
    try {
        const doctors = await allDoctors();
        res.status(200).json(doctors);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
);

export default router;