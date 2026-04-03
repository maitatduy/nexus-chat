import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.model.js";
import Session from "../models/session.model.js";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 ngày

export const signUp = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body;

        const existUser = await User.findOne({
            username,
        });

        if (existUser) {
            return res.status(409).json({
                message: "Tên người dùng đã tồn tại trong hệ thống!",
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

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            username,
        });

        if (!user) {
            return res.status(400).json({
                message: "Tên người dùng hoặc mật khẩu không chính xác",
            });
        }

        const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);

        if (!passwordCorrect) {
            return res.status(400).json({
                message: "Tên người dùng hoặc mật khẩu không chính xác",
            });
        }

        // Tạo access token với jwt
        const accessToken = jwt.sign(
            {
                userId: user._id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_TTL,
            },
        );

        // Tạo refresh token
        const refreshToken = crypto.randomBytes(64).toString("hex");

        // Tạo session mới để lưu refresh token
        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
        });

        // Trả refresh token về trong cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none", // Backend, Frontend deploy riêng,
            maxAge: REFRESH_TOKEN_TTL,
        });

        return res.status(200).json({
            message: `Người dùng ${user.displayName} đã đăng nhập thành công!`,
            accessToken,
        });
    } catch (error) {
        console.error(`[ERROR]: Đăng nhập thất bại! Lỗi: ${error.message}`);
        return res.status(500).json({
            message: "Lỗi hệ thống!",
        });
    }
};

export const signOut = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(400).json({
                message: "Không tìm thấy refresh token!",
            });
        }

        // Xóa session khỏi cơ sở dữ liệu
        await Session.deleteOne({
            refreshToken,
        });

        // Xóa refresh token khỏi cookie
        res.clearCookie("refreshToken");

        return res.status(200).json({
            message: "Đăng xuất thành công!",
        });
    } catch (error) {
        console.error(`[ERROR]: Đăng xuất thất bại! Lỗi: ${error.message}`);
        return res.status(500).json({
            message: "Lỗi hệ thống!",
        });
    }
};

// Tạo access token mới từ refresh token
export const refreshToken = async (req, res) => {
    try {
        // Lấy refresh token từ cookie
        const token = req.cookies?.refreshToken;
        if (!token) {
            return res.status(401).json({
                message: "Token không tồn tại!",
            });
        }

        // So sánh refresh token với database
        const session = await Session.findOne({
            refreshToken: token,
        });

        if (!session) {
            return res.status(403).json({
                message: "Token không hợp lệ hoặc đã hết hạn!",
            });
        }

        // Kiểm tra xem refresh token đã hết hạn chưa
        if (session.expiresAt < new Date()) {
            return res.status(403).json({
                message: "Token đã hết hạn!",
            });
        }

        // Tạo access token mới
        const accessToken = jwt.sign(
            {
                userId: session.userId,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_TTL,
            },
        );

        return res.status(200).json({
            accessToken,
        });
    } catch (error) {
        console.error(`[ERROR]: Lấy access token thất bại! Lỗi: ${error.message}`);
        return res.status(500).json({
            message: "Lỗi hệ thống!",
        });
    }
};
