import express  from "express";
import authRoutes from "./routes/auth.route.js";
import MessageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser'

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

const PORT= process.env.PORT || 5001;

app.use("/api/auth",authRoutes);
app.use("/api/message",MessageRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log(` server running in  http://localhost:${PORT}`)
})
