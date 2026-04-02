export const authMe = async (req, res) => {
    try {
        const user = req.user;

        return res.status(200).json({
            user,
        });
    } catch (error) {
        console.error(`[ERROR]: Lỗi khi gọi authMe. Lỗi: ${error.message}`);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};
