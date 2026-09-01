import type { UseFormReturn } from "react-hook-form";
import type { ExperienceItem } from "../../pages/candidate/Profile.tsx";
import { X } from "lucide-react";

interface ExperienceModalProps {
  form: UseFormReturn<ExperienceItem>;
  onSubmit: (data: ExperienceItem) => void;
  onClose: () => void;
  isEditing: boolean;
}

const ExperienceModal = ({
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
              {isEditing ? "Edit Experience" : "Add Experience"}
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
                Job Title *
              </label>
              <input
                {...form.register("title", { required: true })}
                className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Company *
              </label>
              <input
                {...form.register("company", { required: true })}
                className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Location
              </label>
              <input
                {...form.register("location")}
                className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  {...form.register("startDate")}
                  className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  End Date
                </label>
                <input
                  type="month"
                  disabled={form.watch("currentlyWorking")}
                  {...form.register("endDate")}
                  className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-slate-100"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="currentlyWorking"
                {...form.register("currentlyWorking")}
                className="rounded text-primary focus:ring-primary"
              />
              <label
                htmlFor="currentlyWorking"
                className="text-xs text-slate-700"
              >
                I currently work here
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                {...form.register("description")}
                className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
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
                Save Experience
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal;
