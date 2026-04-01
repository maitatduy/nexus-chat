import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./libs/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());

console.log(process.env.MONGODB_CONNECTION_STRING);

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`[INFO]: Server đang chạy ở cổng ${PORT}`);
    });
});
