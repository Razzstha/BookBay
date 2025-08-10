import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import path from 'path';
import bookRoutes from './routes/bookRoutes.js';
import { fileURLToPath } from 'url';
import categoryRoutes from "./routes/categoryRoutes.js"


connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173', // your React app origin
    credentials: true, // if you use cookies/auth headers
}));

app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoutes);

app.use("/api", bookRoutes);

app.use("/api", categoryRoutes)

app.get("/", (req, res) => {
    res.send("BookBay API is running...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port 3000`);
});