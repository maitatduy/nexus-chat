import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        displayName: {
            type: String,
            required: true,
            trim: true,
        },
        avatarUrl: {
            type: String, // Link CDN để hiển thị hình ảnh
        },
        avatarId: {
            type: String, // Cloundinary public_id để xóa hình ảnh
        },
        bio: {
            type: String,
            maxLength: 500,
        },
        phone: {
            type: String,
            sparse: true, // Cho phép null nhưng nếu có giá trị thì không được phép trùng
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model("User", userSchema, "users");

export default User;
