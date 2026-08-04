import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  }),
);
app.use(express.json()); // To parse JSON bodies sent by the frontend
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to Database
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
