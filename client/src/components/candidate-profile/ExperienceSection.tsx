import { Briefcase, Pencil, Plus, Trash2 } from "lucide-react";
import type { ExperienceItem } from "../../pages/candidate/Profile.tsx";
import { formatDeadline } from "../../utils/formatDeadline.ts";

interface ExperienceProps {
  experiences: ExperienceItem[];
  onEdit: (exp: ExperienceItem) => void;
  onOpen: () => void;
  onDelete: (id: string) => void;
}

const ExperienceSection = ({
  onEdit,
  experiences,
  onOpen,
  onDelete,
}: ExperienceProps) => {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-border-subtle p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <h3 className="text-base font-semibold text-slate-900">
            Work Experience
          </h3>
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add Experience
          </button>
        </div>

        {experiences.length > 0 ? (
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border-subtle hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-50 text-primary rounded-xl shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {exp.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-600">
                      {exp.company} • {exp.location}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatDeadline(exp.startDate)} -{" "}
                      {exp.currentlyWorking
                        ? "Present"
                        : formatDeadline(exp.endDate)}
                    </p>
                    {exp.description && (
                      <p className="text-xs text-slate-600 pt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(exp)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(exp.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center py-4">
            No experience added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;
