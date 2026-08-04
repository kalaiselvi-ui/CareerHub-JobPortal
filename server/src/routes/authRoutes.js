import express from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/authController.js";

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset-password/:token", resetPassword);

export default userRoutes;
