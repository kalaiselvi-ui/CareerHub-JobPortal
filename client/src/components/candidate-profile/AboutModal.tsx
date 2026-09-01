import { X } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";

interface AboutForm {
  bio: string;
}

interface AboutModalProps {
  form: UseFormReturn<AboutForm>;
  onSubmit: (data: AboutForm) => void;
  onClose: () => void;
}

const AboutModal = ({ form, onSubmit, onClose }: AboutModalProps) => {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-border-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <h3 className="text-base font-semibold text-slate-900">
            Edit About Me
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Summary
            </label>

            <textarea
              rows={4}
              {...form.register("bio")}
              className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border-subtle">
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
              Save About
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutModal;
