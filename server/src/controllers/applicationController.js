import { uploadResumeToCloudinary } from "../../utils/uploadResume.js";
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const createApplication = async (req, res) => {
  try {
    const { coverLetter, status } = req.body;
    const { jobId } = req.params;
    const { id: userId, role } = req.user;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "Resume required",
      });
    }

    // if (role !== "candidate") {
    //   return res.status(403).json({
    //     message: "Only job seekers can apply",
    //   });
    // }

    const existingApplication = await Job.findOne({ userId, jobId });
    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied for this job",
      });
    }
    if (job.status === "applied") {
      return res.status(400).json({ message: "Already Applied" });
    }
    const uploadResume = await uploadResumeToCloudinary(req.file.buffer);
    const application = await Application.create({
      resume: uploadResume.secure_url,
      coverLetter,
      status,
      userId,
      jobId,
    });
    return res.status(201).json({
      success: true,
      data: application,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAllJobApplications = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const applications = await Application.find({ userId }).populate("jobId");
    if (!applications.length) {
      return res.status(404).json({ message: "Application not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched all job applications",
      data: applications,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getApplicantsForJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const applications = await Application.find({ jobId }).populate(
      "userId",
      "name email",
    );
    if (!applications.length) {
      return res.status(404).json({ message: "No application found" });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched all user applications",
      data: applications,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const application = await Application.findById(id);
    console.log(application);
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
    application.status = status;
    await application.save();
    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
