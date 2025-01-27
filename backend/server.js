import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app=express();
const port=process.env.port || 5000;

app.use("/api/auth",authRoutes);

app.listen(port,()=>{
    console.log("server is running on https://localhost:"+port);

     connectDB();
});

