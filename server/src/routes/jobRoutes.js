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

const jobRoutes = express.Router();

jobRoutes.post("/", authMiddleware, createJob);
jobRoutes.get("/", getAllJob);
// 2. Specific Named Routes (MUST come before dynamic :id routes)
jobRoutes.get("/my-jobs", authMiddleware, getMyJobs);
jobRoutes.get("/:id", getJobById);
jobRoutes.put("/:id", authMiddleware, updateJob);
jobRoutes.delete("/:id", authMiddleware, deleteJob);

export default jobRoutes;
