import Job from "../models/job.model.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      skills,
      jobType,
      experienceLevel,
      workMode,
      applicationDeadline,
      status,
    } = req.body;
    const { id, role } = req.user;
    if (
      !title ||
      !description ||
      !company ||
      !location ||
      !skills ||
      !salary?.currency ||
      salary?.min == null ||
      salary?.max == null ||
      !salary?.period
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Required Fields" });
    }

    if (role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can create jobs",
      });
    }
    const companyLogo = req.file
      ? await uploadImageToCloudinary(req.file.buffer)
      : null;
    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      skills,
      jobType,
      applicationDeadline,
      status,
      workMode,
      experienceLevel,
      companyLogo: companyLogo?.secure_url,
      createdBy: id,
    });

    return res.status(201).json({
      success: true,
      message: "New Job Created Successfully",
      data: job,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAllJob = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");
    if (!jobs) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res
      .status(200)
      .json({ message: "Successfully fetched all jobs", data: jobs });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate("createdBy", "name email");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "got the jobs by id", data: job });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      skills,
      jobType,
      experienceLevel,
      workMode,
      applicationDeadline,
      status,
    } = req.body;

    const { id: userId, role } = req.user;
    if (role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can update jobs",
      });
    }
    const { id: jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not Found" });
    }
    if (job.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "You cannot update this job" });
    }
    job.title = title ?? job.title;
    job.description = description ?? job.description;
    job.company = company ?? job.company;
    job.location = location ?? job.location;
    job.salary = salary ?? job.salary;
    job.skills = skills ?? job.skills;
    job.status = status ?? job.status;
    job.applicationDeadline = applicationDeadline ?? job.applicationDeadline;
    job.jobType = jobType ?? job.jobType;
    job.experienceLevel = experienceLevel ?? job.experienceLevel;
    job.workMode = workMode ?? job.workMode;

    await job.save();
    return res
      .status(200)
      .json({ success: true, message: "Updated Job Successfully", data: job });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    if (role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can delete jobs",
      });
    }
    const { id: jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    if (job.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "You cannot delete this job" });
    }

    await job.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const { id: userId, role } = req.user;

    // 1. Role verification
    if (role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can view their posted jobs",
      });
    }

    // 2. Query jobs created by this recruiter and populate the User model
    const jobs = await Job.find({ createdBy: userId }).populate({
      path: "createdBy",
      select: "name email role", // Fields to retrieve from the User model (exclude sensitive data like password)
    });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      message: "Recruiter jobs retrieved successfully",
      data: jobs,
    });
  } catch (err) {
    console.error("Error in getMyJobs:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
