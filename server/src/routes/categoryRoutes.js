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
  authorizeRoles("admin"),
  createCategory,
);
categoryRoutes.get("/", getCategory);
categoryRoutes.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteCategory,
);

export default categoryRoutes;
