import { uploadResumeToCloudinary } from "../../utils/uploadResume.js";
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

// ==========================================
// Candidate: Apply for a job
// POST /applications/:jobId
// ==========================================
export const createApplication = async (req, res) => {
  try {
    const { coverLetter } = req.body;
    const { jobId } = req.params;
    const { id: userId, role } = req.user;

    // Only candidates can apply
    if (role !== "candidate") {
      return res.status(403).json({
        message: "Only candidates can apply for jobs",
      });
    }

    // Check whether job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check whether job is active
    if (job.status !== "active") {
      return res.status(400).json({
        message: "This job is not accepting applications",
      });
    }

    // Resume required
    if (!req.file) {
      return res.status(400).json({
        message: "Resume required",
      });
    }

    // Check whether candidate already applied
    const existingApplication = await Application.findOne({
      userId,
      jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied for this job",
      });
    }

    // Upload resume
    const uploadResume = await uploadResumeToCloudinary(req.file.buffer);

    // Create application
    const application = await Application.create({
      resume: uploadResume.secure_url,
      coverLetter,
      userId,
      jobId,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==========================================
// Candidate: Get my applications
// GET /applications/my
// ==========================================
export const getAllJobApplications = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const applications = await Application.find({
      userId,
    })
      .populate("jobId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Fetched all job applications",
      data: applications,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==========================================
// Recruiter: Get applicants for ONE job
// GET /applications/job/:id
// ==========================================
export const getApplicantsForJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const { id: recruiterId, role } = req.user;

    // Only recruiters can access applicants
    if (role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can view applicants",
      });
    }

    // Check whether job exists AND belongs to this recruiter
    const job = await Job.findOne({
      _id: jobId,
      createdBy: recruiterId,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found or unauthorized",
      });
    }

    const applications = await Application.find({
      jobId,
    })
      .populate("userId", "fullName email")
      .populate("jobId", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Fetched applicants for the job",
      data: applications,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==========================================
// Recruiter: Get ALL applications for my jobs
// GET /applications/recruiter
// ==========================================
export const getRecruiterApplications = async (req, res) => {
  try {
    const { id: recruiterId, role } = req.user;

    // Only recruiters can access this
    if (role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can view applications",
      });
    }

    // Find jobs created by this recruiter
    const jobs = await Job.find({
      createdBy: recruiterId,
    }).select("_id");

    const jobIds = jobs.map((job) => job._id);

    // Find applications for those jobs
    const applications = await Application.find({
      jobId: {
        $in: jobIds,
      },
    })
      .populate("userId", "fullName email")
      .populate("jobId", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Fetched recruiter applications",
      data: applications,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==========================================
// Recruiter: Update application status
// PATCH /applications/status/:id
// ==========================================
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id: applicationId } = req.params;
    const { id: recruiterId, role } = req.user;

    if (role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can update application status",
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Check whether the application belongs to a job
    // created by this recruiter
    const job = await Job.findOne({
      _id: application.jobId,
      createdBy: recruiterId,
    });

    if (!job) {
      return res.status(403).json({
        message: "You are not authorized to update this application",
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

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCandidateDashboardStats = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    if (role !== "candidate") {
      return res.status(403).json({
        message: "Only candidates can access this dashboard",
      });
    }
    const totalApplications = await Application.countDocuments({
      userId,
      status: "applied",
    });
    const pendingApplications = await Application.countDocuments({
      userId,
      status: "applied",
    });
    const shortlistedApplications = await Application.countDocuments({
      userId,
      status: "shortlisted",
    });
    const rejectedApplications = await Application.countDocuments({
      userId,
      status: "rejected",
    });

    res.status(200).json({
      totalApplications,
      pendingApplications,
      shortlistedApplications,
      rejectedApplications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });
  }
};
