import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true, // Optional: set to true if every job must have a category
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: { type: String, trim: true },
    salary: { type: Number, min: 0 },
    skills: [{ type: String, trim: true }],
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract"],
      default: "full-time",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
