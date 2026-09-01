import { Check, X } from "lucide-react";

interface CompletionItem {
  label: string;
  completed: boolean;
}
interface ProfileCompletionProps {
  completionItems: CompletionItem[];
}
const ProfileCompletion = ({ completionItems }: ProfileCompletionProps) => {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-border-subtle p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Profile Completion Status
            </h3>
            <p className="text-xs text-slate-500">
              Complete your profile to improve your visibility to recruiters.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {completionItems.map((item, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                item.completed
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-slate-50 text-slate-500 border-border-subtle"
              }`}
            >
              {item.completed ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <X className="w-3.5 h-3.5 text-slate-400" />
              )}
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
