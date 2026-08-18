import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, Send, ArrowLeft, Loader2 } from "lucide-react";
import { applicationMutation } from "../../mutations/applicationMutation.ts";
import toast from "react-hot-toast";

export const ApplyJobPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");
  const { createApplicationMutation } = applicationMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setError("Please upload a resume file.");
      return;
    }

    if (!jobId) {
      setError("Job ID is missing.");
      return;
    }
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);
    createApplicationMutation.mutate(
      { jobId: jobId!, formData },
      {
        onSuccess: () => {
          toast.success("Application submitted successfully!");
          navigate("/candidate/my-applications");
        },
        onError: (error: any) => {
          setError(
            error.response?.data?.message || "Failed to submit application.",
          );
        },
      },
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Job Details
      </button>

      <div className="bg-white border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-dark">
            Submit Your Application
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Please fill in the details below to complete your application.
          </p>
        </div>

        {error && (
          <div className="p-4 text-sm bg-red-50 text-red-600 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-semibold text-surface-dark mb-2">
              Upload Resume / CV *
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer relative bg-slate-50/50">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">
                {resume ? resume.name : "Click or drag your resume to upload"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                PDF or DOCX up to 5MB
              </p>
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-semibold text-surface-dark mb-2">
              Cover Letter (Optional)
            </label>
            <textarea
              rows={5}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Explain why you are a great candidate for this role..."
              className="w-full p-4 border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createApplicationMutation.isPending}
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl flex items-center gap-2 disabled:opacity-50 transition-all cursor-pointer shadow-md shadow-primary/20"
            >
              {createApplicationMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" /> Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobPage;
