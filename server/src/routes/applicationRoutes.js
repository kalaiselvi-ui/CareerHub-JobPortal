import express from "express";
import {
  createApplication,
  getAllJobApplications,
  getApplicantsForJob,
  getCandidateDashboardStats,
  getRecruiterApplications,
  updateStatus,
} from "../controllers/applicationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadResume } from "../middleware/uploadResume.js";

const applicationRoutes = express.Router();

applicationRoutes.post(
  "/:jobId",
  authMiddleware,
  uploadResume.single("resume"),
  createApplication,
);

applicationRoutes.get("/my", authMiddleware, getAllJobApplications);

applicationRoutes.get("/recruiter", authMiddleware, getRecruiterApplications);

applicationRoutes.get("/job/:id", authMiddleware, getApplicantsForJob);
applicationRoutes.get(
  "/candidate/stats",
  authMiddleware,
  getCandidateDashboardStats,
);

applicationRoutes.patch("/status/:id", authMiddleware, updateStatus);

export default applicationRoutes;
