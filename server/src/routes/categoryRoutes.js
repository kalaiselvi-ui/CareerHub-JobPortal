import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
} from "../controllers/categoryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/adminMiddleware.js";

const categoryRoutes = express.Router();

categoryRoutes.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "recruiter"),
  createCategory,
);
categoryRoutes.get("/", getCategory);
categoryRoutes.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "recruiter"),
  deleteCategory,
);

export default categoryRoutes;
