import { z } from "zod";

// Helper to split text by lines into a cleaned array of strings
const lineToArray = z.preprocess((val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    return val
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
  return [];
}, z.array(z.string()).optional().default([]));

export const jobSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  company: z.string().min(1, "Company name is required"),
  aboutCompany: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(1, "Location is required"),
  jobType: z.enum(["full-time", "part-time", "contract"]),
  workMode: z.enum(["on-site", "remote", "hybrid"]),
  experienceLevel: z.enum([
    "entry level",
    "mid level",
    "senior level",
    "lead",
    "executive",
  ]),
  description: z
    .string()
    .min(20, "Description should be at least 20 characters"),

  // Transforms multi-line text into string[] automatically
  responsibilities: lineToArray,
  requirements: lineToArray,

  salary: z.object({
    currency: z.enum(["AED", "USD", "EUR", "GBP", "INR"]),
    min: z.coerce.number().min(0),
    max: z.coerce.number().min(0),
    period: z.enum(["month", "year"]),
  }),
  // skills: z.array(z.string()).min(1, "Add at least one required skill"),
  skills: z.array(z.string()).default([]),
  applicationDeadline: z.string().min(1, "Application deadline is required"),
  status: z.enum(["active", "closed", "draft"]),
});

export type JobFormInput = z.input<typeof jobSchema>;
export type JobFormData = z.output<typeof jobSchema>;
