import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectdb } from './db/db.js';
import authRoutes from './routes/AuthRoutes.js';

dotenv.config();
const app= express();
const port = process.env.PORT || 5000;
const db=process.env.DATABASE_URL

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:['GET','PUT','POST','PATCH','DELETE'],
    credentials: true, 
  }));
app.use('/uploads/profiles',express.static('uploads/profiles'));
app.use(cookieParser());
app.use(express.json())

app.use('/api/auth',authRoutes);

app.listen(port,async()=>{
     await connectdb();
    console.log(`server running in http://localhost:${port}`)
})