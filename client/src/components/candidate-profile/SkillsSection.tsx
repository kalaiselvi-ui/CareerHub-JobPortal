import { Pencil } from "lucide-react";

interface SkillsProps {
  skills: string[];
  onEdit: () => void;
}
const SkillsSection = ({ skills, onEdit }: SkillsProps) => {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-border-subtle p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <h3 className="text-base font-semibold text-slate-900">Skills</h3>
          <button
            onClick={onEdit}
            className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-border-subtle"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center">
            <p className="text-sm text-slate-400 mb-2">
              Add your skills to help recruiters understand your expertise.
            </p>
            <button
              onClick={onEdit}
              className="text-xs font-medium text-primary hover:underline"
            >
              + Add Skills
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
