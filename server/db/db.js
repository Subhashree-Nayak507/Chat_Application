import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectdb = async () => {
    try {
        const connect =   await mongoose.connect( process.env.DATABASE_URL);
        console.log("Mongodb is connected");
    } catch (e) {
        console.log("Error in connecting mongodb",e);
        process.exit(1);
    }
}