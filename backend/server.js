import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app=express();
const port=process.env.PORT || 5000;

app.use(express.json()); //parse the body of the request
app.use(cookieParser());

app.get("/",(req,res)=>{res.send("Hello World")});
app.use("/api/auth",authRoutes);

app.use("/api/products",productRoutes);


app.listen(port,()=>{
    console.log("server is running on https://localhost:"+port);

     connectDB();
});

