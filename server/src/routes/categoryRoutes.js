import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
} from "../controllers/categoryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeAdmin } from "../middleware/adminMiddleware.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/", authMiddleware, authorizeAdmin, createCategory);
categoryRoutes.get("/", getCategory);
categoryRoutes.delete("/:id", authMiddleware, authorizeAdmin, deleteCategory);

export default categoryRoutes;
