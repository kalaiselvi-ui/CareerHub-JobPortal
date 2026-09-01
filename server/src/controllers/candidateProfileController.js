import { uploadResumeToCloudinary } from "../../utils/uploadResume.js";
import CandidateProfile from "../models/candidateProfile.model.js";
import User from "../models/user.model.js";

export const createCandidateProfile = async (req, res) => {
  try {
    const { id: userId, role } = req.user;

    if (role !== "candidate") {
      return res.status(403).json({
        success: false,
        message: "Only candidates can create a profile",
      });
    }

    const existingProfile = await CandidateProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Candidate profile already exists",
      });
    }

    // 1. Update User model (fullName, email, phone, location)
    const { fullName, email, phone, location } = req.body;
    await User.findByIdAndUpdate(
      userId,
      { fullName, email, phone, location },
      { runValidators: true },
    );

    // 2. Handle optional Resume upload
    let resumeUrl = "";
    if (req.file) {
      const uploadResume = await uploadResumeToCloudinary(req.file.buffer);
      resumeUrl = uploadResume.secure_url;
    }

    // 3. Create Candidate Profile
    const profile = await CandidateProfile.create({
      userId,
      headline: req.body.headline,
      bio: req.body.bio,
      skills: JSON.parse(req.body.skills || "[]"),
      experience: JSON.parse(req.body.experience || "[]"),
      education: JSON.parse(req.body.education || "[]"),
      socialLinks: JSON.parse(req.body.socialLinks || "{}"),
      ...(resumeUrl && { resume: resumeUrl }),
    });

    return res.status(201).json({
      success: true,
      message: "Candidate profile created successfully",
      data: profile,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateCandidateProfile = async (req, res) => {
  try {
    const { id: userId, role } = req.user;

    // 1. Check candidate role
    if (role !== "candidate") {
      return res.status(403).json({
        success: false,
        message: "Only candidates can update candidate profile",
      });
    }

    // 2. Extract basic info (EXCLUDE email from user update)
    const { fullName, phone, location } = req.body;

    const userUpdates = {};
    if (fullName !== undefined) userUpdates.fullName = fullName;
    if (phone !== undefined) userUpdates.phone = phone;
    if (location !== undefined) userUpdates.location = location;

    // Update User model ONLY with fullName, phone, location (NO email)
    if (Object.keys(userUpdates).length > 0) {
      await User.findByIdAndUpdate(
        userId,
        { $set: userUpdates },
        { returnDocument: "after", runValidators: true },
      );
    }

    // 3. Prepare CandidateProfile data
    const updateData = {
      headline: req.body.headline,
      bio: req.body.bio,
      skills: JSON.parse(req.body.skills || "[]"),
      experience: JSON.parse(req.body.experience || "[]"),
      education: JSON.parse(req.body.education || "[]"),
      socialLinks: JSON.parse(req.body.socialLinks || "{}"),
    };

    if (req.file) {
      const uploadResume = await uploadResumeToCloudinary(req.file.buffer);
      updateData.resume = uploadResume.secure_url;
    }

    // 4. Update CandidateProfile and return populated User data
    const profile = await CandidateProfile.findOneAndUpdate(
      { userId },
      { $set: updateData },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
      },
    ).populate("userId", "fullName email phone location");

    return res.status(200).json({
      success: true,
      message: "Candidate profile updated successfully",
      data: profile,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCandidateProfile = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const profile = await CandidateProfile.findOne({ userId }).populate(
      "userId",
      "fullName email phone location",
    );
    // Handle initial empty state without throwing a 404 error
    if (!profile) {
      return res.status(200).json({
        success: true,
        data: null, // or send default basic info from req.user
        message: "Profile not created yet",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
