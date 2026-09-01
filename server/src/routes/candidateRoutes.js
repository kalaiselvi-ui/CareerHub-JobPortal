import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadResume } from "../middleware/uploadResume.js";
import { getCandidateProfile } from "../controllers/candidateProfileController.js";
import { createCandidateProfile } from "../controllers/candidateProfileController.js";
import { updateCandidateProfile } from "../controllers/candidateProfileController.js";

const candidateProfileRoutes = express.Router();

candidateProfileRoutes.post(
  "/profile",
  authMiddleware,
  uploadResume.single("resume"),
  createCandidateProfile,
);

candidateProfileRoutes.get("/profile", authMiddleware, getCandidateProfile);

candidateProfileRoutes.put(
  "/profile",
  authMiddleware,
  uploadResume.single("resume"),
  updateCandidateProfile,
);

export default candidateProfileRoutes;
