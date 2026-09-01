import { useState, type ChangeEvent } from "react";
import { Upload, X } from "lucide-react";

interface ResumeModalProps {
  onSave: (file: File) => void;
  onClose: () => void;
}

const ResumeModal = ({ onSave, onClose }: ResumeModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (selectedFile) {
      onSave(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-border-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <h3 className="text-base font-semibold text-slate-900">
            Upload Resume
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <label className="border-2 border-dashed border-border-subtle rounded-xl p-6 text-center bg-slate-50/50 space-y-2 cursor-pointer block hover:bg-slate-100/50 transition-colors">
          <Upload className="w-8 h-8 text-primary mx-auto" />
          <p className="text-xs font-medium text-slate-700">
            {selectedFile
              ? selectedFile.name
              : "Click to select or drag and drop your file here"}
          </p>
          <p className="text-[10px] text-slate-400">PDF, DOCX up to 5MB</p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <div className="flex justify-end gap-2 pt-2 border-t border-border-subtle">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border-subtle text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedFile}
            className="px-4 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
