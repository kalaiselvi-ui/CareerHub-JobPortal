import express from "express";
import {
  deleteUserById,
  editProfile,
  getAllUser,
  getMyProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/adminMiddleware.js";
import { uploadImage } from "../middleware/uploadImage.js";

const userRoutes = express.Router();

userRoutes.get("/me", authMiddleware, getMyProfile);
userRoutes.get("/", authMiddleware, authorizeRoles("admin"), getAllUser);
userRoutes.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteUserById,
);
userRoutes.put(
  "/me",
  authMiddleware,
  uploadImage.single("profileImage"),
  editProfile,
);

export default userRoutes;
