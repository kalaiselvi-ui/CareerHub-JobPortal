import { GraduationCap, Pencil, Plus, Trash2 } from "lucide-react";
import type { EducationItem } from "../../pages/candidate/Profile.tsx";
import { formatDeadline } from "../../utils/formatDeadline.ts";

interface ExperienceProps {
  educations: EducationItem[];
  onEdit: (exp: EducationItem) => void;
  onOpen: () => void;
  onDelete: (id: string) => void;
}

const EducationSection = ({
  educations,
  onOpen,
  onDelete,
  onEdit,
}: ExperienceProps) => {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-border-subtle p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <h3 className="text-base font-semibold text-slate-900">Education</h3>
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add Education
          </button>
        </div>

        {educations.length > 0 ? (
          <div className="space-y-4">
            {educations.map((edu) => (
              <div
                key={edu.id}
                className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border-subtle hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-50 text-primary rounded-xl shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </h4>
                    <p className="text-xs font-medium text-slate-600">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatDeadline(edu.startDate)} -{" "}
                      {formatDeadline(edu.endDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(edu)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(edu.id)}
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
            No education added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default EducationSection;
