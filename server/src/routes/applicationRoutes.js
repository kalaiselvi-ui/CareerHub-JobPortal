import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createApplication,
  getAllJobApplications,
  getApplicantsForJob,
  updateStatus,
} from "../controllers/applicationController.js";
import { uploadResume } from "../middleware/uploadResume.js";

const applicationRoutes = express.Router();

applicationRoutes.post(
  "/:jobId",
  authMiddleware,
  uploadResume.single("resume"),
  createApplication,
);
applicationRoutes.get("/my", authMiddleware, getAllJobApplications);
applicationRoutes.get("/job/:id", authMiddleware, getApplicantsForJob);
applicationRoutes.patch("/status/:id", authMiddleware, updateStatus);

export default applicationRoutes;
