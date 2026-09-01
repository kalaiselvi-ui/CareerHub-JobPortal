import { FileText, Upload } from "lucide-react";
import type { ResumeType } from "../../pages/candidate/Profile.tsx";

interface ResumeProps {
  resume: ResumeType | null;
  onUploadClick: () => void;
}

const ResumeSection = ({ resume, onUploadClick }: ResumeProps) => {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-border-subtle p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <h3 className="text-base font-semibold text-slate-900">Resume</h3>
        </div>

        {resume ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border-subtle bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {resume.name}
                </p>
                <p className="text-xs text-slate-400">Uploaded {resume.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-white border border-border-subtle text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors">
                View Resume
              </button>
              <button
                onClick={onUploadClick}
                className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-hover transition-colors"
              >
                Replace Resume
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={onUploadClick}
            className="border-2 border-dashed border-border-subtle rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors bg-slate-50/30"
          >
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700">
              No resume uploaded yet.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Drag and drop your resume file here or click to browse (PDF,
              DOCX).
            </p>
            <button className="mt-4 px-4 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-hover transition-colors">
              Upload Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeSection;
