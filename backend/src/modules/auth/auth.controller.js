import User from "./auth.model.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import sendEmail from "../../utils/sendEmail.js";

// Đổi mật khẩu
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id; // cần middleware verifyToken
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return res.status(400).json({ message: "Mật khẩu cũ không đúng" });

    user.password = newPassword;
    await user.save();
    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Quên mật khẩu
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "Không tìm thấy email" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 phút
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendEmail(user.email, "Đặt lại mật khẩu", `Link reset: ${resetUrl}`);

    res.json({ message: "Email reset mật khẩu đã được gửi!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reset mật khẩu
export const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpire: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });

    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.json({ message: "Đặt lại mật khẩu thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
