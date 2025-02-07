import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";

dotenv.config();

const app=express();
const port=process.env.PORT || 5000;

app.use(express.json()); //parse the body of the request
app.use(cookieParser());


app.use("/api/auth",authRoutes);

app.use("/api/products",productRoutes);

app.use("/api/cart",cartRoutes);

app.use("/api/coupon",couponRoutes);

app.use("/api/payments",paymentRoutes);


app.listen(port,()=>{
    console.log("server is running on https://localhost:"+port);

     connectDB();
});

