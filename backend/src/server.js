import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./libs/database.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cookieParser());

// public routes
app.use("/api/auth", authRoute);

// private routes

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`[INFO]: Server đang chạy ở cổng ${PORT}`);
    });
});
