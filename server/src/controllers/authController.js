import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../services/emailService.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "required field" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password,
      role,
    });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    return res.status(201).json({
      success: true,
      message: "New User Created Successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Email & password mismatch" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    return res.status(201).json({
      success: true,
      message: "User Logged In Successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
};

export const forgotPassword = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "required field" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Email not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetTokenExpires = Date.now() + 15 * 60 * 1000;

    existingUser.resetPasswordToken = hashedToken;
    existingUser.resetPasswordExpires = resetTokenExpires;

    await existingUser.save();
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail(
      existingUser.email,
      "Reset Your CareerHub Password",
      `Click the link below to reset your password:\n\n${resetUrl}\n\nThis link will expire in 15 minutes.`,
    );

    return res.status(200).json({ message: "Reset link send successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!token) {
      return res.status(404).json({ message: "token not found" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({ resetPasswordToken: hashedToken });
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }
    if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({
        message: "Reset token has expired",
      });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
