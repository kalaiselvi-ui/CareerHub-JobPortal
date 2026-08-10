import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  jobSchema,
  type JobFormData,
  type JobFormInput,
} from "../../schemas/jobSchema";
import { jobMutation } from "../../mutations/jobMutation";
import { useCategories } from "../../hooks/useCategories.ts";
import { useJobById, useJobs } from "../../hooks/useJob.ts"; // Replace with your actual hook for fetching single job

interface EditJobProps {
  jobId?: string;
}

export const EditJob = ({ jobId: propJobId }: EditJobProps) => {
  const { id: urlJobId } = useParams<{ id: string }>();
  const jobId = propJobId || urlJobId;
  const isEditMode = Boolean(jobId);

  const [skillInput, setSkillInput] = useState("");
  const navigate = useNavigate();

  // Fetch categories and (if editing) existing job data
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();
  const {
    data: existingJob,
    isLoading: isJobLoading,
    isError: isJobError,
  } = useJobById(jobId); // Skip query internally if !jobId

  const { createJobMutation, editJobMutation } = jobMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormInput, unknown, JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobType: "full-time",
      workMode: "on-site",
      experienceLevel: "mid level",
      category: "",
      status: "active",
      salary: {
        currency: "AED",
        min: 0,
        max: 0,
        period: "month",
      },
      skills: [],
      requirements: [],
      responsibilities: [],
    },
  });

  // 3. Update form values as soon as existingJob arrives
  useEffect(() => {
    if (isEditMode && existingJob) {
      reset({
        title: existingJob.title || "",
        company: existingJob.company || "",
        aboutCompany: existingJob.aboutCompany || "",
        // Handle category if populated object vs string ID
        category:
          typeof existingJob.category === "object"
            ? existingJob.category._id
            : existingJob.category || "",
        location: existingJob.location || "",
        jobType: existingJob.jobType || "full-time",
        workMode: existingJob.workMode || "on-site",
        experienceLevel: existingJob.experienceLevel || "mid level",
        description: existingJob.description || "",
        // Convert arrays to newline-separated strings if needed for textareas
        responsibilities: Array.isArray(existingJob.responsibilities)
          ? existingJob.responsibilities.join("\n")
          : existingJob.responsibilities || "",
        requirements: Array.isArray(existingJob.requirements)
          ? existingJob.requirements.join("\n")
          : existingJob.requirements || "",
        salary: {
          currency: existingJob.salary?.currency || "AED",
          min: existingJob.salary?.min || 0,
          max: existingJob.salary?.max || 0,
          period: existingJob.salary?.period || "month",
        },
        skills: existingJob.skills || [],
        applicationDeadline: existingJob.applicationDeadline
          ? new Date(existingJob.applicationDeadline)
              .toISOString()
              .split("T")[0]
          : "",
        status: existingJob.status || "active",
      });
    }
  }, [existingJob, isEditMode, reset]);

  const skills = watch("skills") || [];

  // Skill Handlers
  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setValue("skills", [...skills, trimmed], { shouldValidate: true });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (item: string) => {
    setValue(
      "skills",
      skills.filter((s) => s !== item),
      { shouldValidate: true },
    );
  };

  if (isCategoriesLoading || (isEditMode && isJobLoading)) {
    return (
      <div className="p-8 text-center text-gray-500">Loading details...</div>
    );
  }

  if (isCategoriesError || (isEditMode && isJobError)) {
    return (
      <div className="p-8 text-center text-red-500">
        Something went wrong while fetching data.
      </div>
    );
  }

  const onSubmit = (formData: JobFormData) => {
    if (isEditMode && jobId) {
      editJobMutation.mutate(
        { id: jobId, data: formData },
        {
          onSuccess: () => {
            toast.success("Job Updated Successfully");
            navigate("/jobs/manage");
          },
        },
      );
    } else {
      createJobMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Job Created Successfully");
          navigate("/jobs/manage");
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto p-4 sm:p-6"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditMode ? "Edit Job" : "Create New Job"}
        </h2>
      </div>

      {/* 1. Basic Information */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Basic Information
        </h3>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title")}
            placeholder="e.g. Senior React Developer"
            className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("company")}
            placeholder="e.g. Tech Solutions"
            className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
          {errors.company && (
            <p className="text-xs text-red-500 mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* About Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            About Company <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("aboutCompany")}
            rows={3}
            placeholder="Brief description about the company..."
            className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
          {errors.aboutCompany && (
            <p className="text-xs text-red-500 mt-1">
              {errors.aboutCompany.message}
            </p>
          )}
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register("category")}
            className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            disabled={isCategoriesLoading}
          >
            <option value="">Select a Category</option>
            {categoriesData?.category?.map(
              (cat: { _id: string; name: string }) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ),
            )}
          </select>
          {errors.category && (
            <p className="text-xs text-red-500 mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            {...register("location")}
            placeholder="e.g. Dubai, UAE"
            className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
          {errors.location && (
            <p className="text-xs text-red-500 mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Selects Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              {...register("jobType")}
              className="w-full mt-1 p-2.5 border rounded-lg"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Work Mode
            </label>
            <select
              {...register("workMode")}
              className="w-full mt-1 p-2.5 border rounded-lg"
            >
              <option value="on-site">On-site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience Level
            </label>
            <select
              {...register("experienceLevel")}
              className="w-full mt-1 p-2.5 border rounded-lg"
            >
              <option value="entry level">Entry Level</option>
              <option value="mid level">Mid Level</option>
              <option value="senior level">Senior Level</option>
            </select>
          </div>
        </div>
      </section>

      {/* 2. Job Details & Descriptions */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Job Details</h3>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Describe the role and key overview..."
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Responsibilities
          </label>
          <p className="text-xs text-gray-500 mb-1.5">
            Enter each responsibility on a new line.
          </p>
          <textarea
            {...register("responsibilities")}
            rows={4}
            placeholder={
              "• Lead frontend architecture\n• Mentor junior developers\n• Code reviews and performance optimization"
            }
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm font-mono"
          />
          {errors.responsibilities && (
            <p className="text-xs text-red-500 mt-1">
              {errors.responsibilities.message}
            </p>
          )}
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requirements
          </label>
          <p className="text-xs text-gray-500 mb-1.5">
            Enter each requirement on a new line.
          </p>
          <textarea
            {...register("requirements")}
            rows={4}
            placeholder={
              "• 3+ years experience with React & TypeScript\n• Experience with state management (Redux, Zustand, React Query)\n• Strong CSS/Tailwind skills"
            }
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm font-mono"
          />
          {errors.requirements && (
            <p className="text-xs text-red-500 mt-1">
              {errors.requirements.message}
            </p>
          )}
        </div>
      </section>

      {/* 3. Salary Information */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Salary Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              {...register("salary.currency")}
              className="w-full mt-1 p-2.5 border rounded-lg"
            >
              <option value="AED">AED</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Salary
            </label>
            <input
              type="number"
              {...register("salary.min", { valueAsNumber: true })}
              className="w-full mt-1 p-2.5 border rounded-lg"
            />
            {errors.salary?.min && (
              <p className="text-xs text-red-500 mt-1">
                {errors.salary.min.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Salary
            </label>
            <input
              type="number"
              {...register("salary.max", { valueAsNumber: true })}
              className="w-full mt-1 p-2.5 border rounded-lg"
            />
            {errors.salary?.max && (
              <p className="text-xs text-red-500 mt-1">
                {errors.salary.max.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Period
            </label>
            <select
              {...register("salary.period")}
              className="w-full mt-1 p-2.5 border rounded-lg"
            >
              <option value="month">Per Month</option>
              <option value="year">Per Year</option>
            </select>
          </div>
        </div>
      </section>

      {/* 4. Skills Section */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            placeholder="Enter a skill (e.g. Node.js)"
            className="flex-1 p-2.5 border rounded-lg"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/80"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-primary/70 hover:text-red-500 font-bold"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        {errors.skills && (
          <p className="text-xs text-red-500 mt-1">{errors.skills.message}</p>
        )}
      </section>

      {/* 5. Application Details */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Application Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Application Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("applicationDeadline")}
              className="w-full mt-1 p-2.5 border rounded-lg"
            />
            {errors.applicationDeadline && (
              <p className="text-xs text-red-500 mt-1">
                {errors.applicationDeadline.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              {...register("status")}
              className="w-full mt-1 p-2.5 border rounded-lg"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 border rounded-xl hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover disabled:opacity-50"
        >
          {isSubmitting
            ? isEditMode
              ? "Saving..."
              : "Creating..."
            : isEditMode
              ? "Update Job"
              : "Create Job"}
        </button>
      </div>
    </form>
  );
};
