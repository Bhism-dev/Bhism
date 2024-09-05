import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(3000, function() {
    console.log("Server is running on port http://localhost:3000");
})