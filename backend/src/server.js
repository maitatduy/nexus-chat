import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDatabase } from "./libs/database.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import friendRoute from "./routes/friend.route.js";

import { protectedRoute } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL || "http://localhost:5173",
    }),
);

// public routes
app.use("/api/auth", authRoute);

// private routes
app.use(protectedRoute);
app.use("/api/users", userRoute);
app.use("/api/friends", friendRoute);

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`[INFO]: Server đang chạy ở cổng ${PORT}`);
    });
});
