import express  from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

const app = express();
dotenv.config();
app.use(express.json());

const PORT= process.env.PORT || 5001;

app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log(` server running in  http://localhost:${PORT}`)
})
