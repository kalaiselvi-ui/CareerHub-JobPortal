import { Pencil } from "lucide-react";

interface AboutFormProps {
  bio: string;
  onEdit: () => void;
}

const AboutSection = ({ onEdit, bio }: AboutFormProps) => {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-border-subtle p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <h3 className="text-base font-semibold text-slate-900">About Me</h3>
          <button
            onClick={onEdit}
            className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
        {bio ? (
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {bio}
          </p>
        ) : (
          <div className="py-4 text-center">
            <p className="text-sm text-slate-400 mb-2">
              Add a short professional summary.
            </p>
            <button
              onClick={onEdit}
              className="text-xs font-medium text-primary hover:underline"
            >
              + Add About
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
