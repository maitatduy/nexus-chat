import mongoose from "mongoose";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("[INFO]: Kết nối database thành công!");
    } catch (error) {
        console.log("[ERROR]: Kết nối database thất bại! Lỗi: " + error.message);
        process.exit(1);
    }
};
