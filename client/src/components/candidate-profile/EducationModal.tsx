import type { UseFormReturn } from "react-hook-form";
import type { EducationItem } from "../../pages/candidate/Profile.tsx";
import { X } from "lucide-react";

interface ExperienceModalProps {
  form: UseFormReturn<EducationItem>;
  onSubmit: (data: EducationItem) => void;
  onClose: () => void;
  isEditing: boolean;
}
const EducationModal = ({
  form,
  onSubmit,
  onClose,
  isEditing,
}: ExperienceModalProps) => {
  return (
    <div>
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-border-subtle space-y-4 my-8">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <h3 className="text-base font-semibold text-slate-900">
              {isEditing ? "Edit Education" : "Add Education"}
            </h3>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Institution *
              </label>
              <input
                {...form.register("institution", {
                  required: true,
                })}
                className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Degree
              </label>
              <input
                {...form.register("degree")}
                className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Field of Study
              </label>
              <input
                {...form.register("fieldOfStudy")}
                className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Start Date
                </label>
                <input
                  {...form.register("startDate")}
                  placeholder="YYYY"
                  className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  End Date
                </label>
                <input
                  {...form.register("endDate")}
                  placeholder="YYYY"
                  className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-border-subtle text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-hover"
              >
                Save Education
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EducationModal;
