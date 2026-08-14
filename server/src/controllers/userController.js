import { uploadImageToCloudinary } from "../../utils/uploadImage.js";
import User from "../models/user.model.js";

export const getMyProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select(
      "-password -resetPasswordToken -resetPasswordExpires",
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await user.deleteOne();

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { fullName, email, phone, location, bio, profileImage } = req.body;
    const { id } = req.user;
    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name and email are required",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.fullName = fullName ?? user.fullName;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.location = location ?? user.location;
    user.bio = bio ?? user.bio;

    if (req.file) {
      const profileImage = await uploadImageToCloudinary(req.file.buffer);
      user.profileImage = profileImage.secure_url;
    }

    await user.save();
    const updatedUser = await User.findById(id).select(
      "-password -resetPasswordToken -resetPasswordExpires",
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
