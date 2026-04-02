import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const signUp = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body;

        const existUser = await User.findOne({
            username,
        });

        if (existUser) {
            return res.status(409).json({
                message: "Username đã tồn tại trong hệ thống!",
            });
        }

        // Mã hóa password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user
        await User.create({
            username,
            hashedPassword,
            email,
            displayName: `${firstName} ${lastName}`,
        });

        return res.sendStatus(201);
    } catch (error) {
        console.error(`[ERROR]: Đăng ký thất bại! Lỗi: ${error.message}`);
        return res.status(500).json({
            message: "Lỗi hệ thống!",
        });
    }
};
