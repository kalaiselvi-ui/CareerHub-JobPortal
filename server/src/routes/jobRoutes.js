import express from "express";
import {
  createJob,
  deleteJob,
  getAllJob,
  getJobById,
  getMyJobs,
  updateJob,
} from "../controllers/jobController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadImage.js";
import { authorizeRoles } from "../middleware/adminMiddleware.js";

const jobRoutes = express.Router();

jobRoutes.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "recruiter"),
  uploadImage.single("companyLogo"),
  createJob,
);
jobRoutes.get("/", getAllJob);
// 2. Specific Named Routes (MUST come before dynamic :id routes)
jobRoutes.get("/my-jobs", authMiddleware, getMyJobs);
jobRoutes.get("/:id", getJobById);
jobRoutes.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "recruiter"),
  updateJob,
);
jobRoutes.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "recruiter"),
  deleteJob,
);

export default jobRoutes;
