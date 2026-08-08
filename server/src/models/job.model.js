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
    companyLogo: {
      type: String,
    },
    location: { type: String, trim: true },
    salary: {
      currency: {
        type: String,
        enum: ["AED", "USD", "EUR", "GBP", "INR", "SGD"],
        default: "AED",
        required: true,
      },
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
      period: {
        type: String,
        enum: ["month", "year"],
        required: true,
      },
    },
    skills: [{ type: String, trim: true }],
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract"],
      default: "full-time",
    },
    applicationDeadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active",
    },
    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
    },

    experienceLevel: {
      type: String,
      enum: ["Entry Level", "Mid Level", "Senior Level"],
    },

    responsibilities: {
      type: [String],
    },

    requirements: {
      type: [String],
    },

    aboutCompany: {
      type: String,
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
