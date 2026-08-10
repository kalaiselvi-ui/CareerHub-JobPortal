import { AlertTriangle, X } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  itemName: string;
  itemType: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  itemName,
  itemType,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-border-subtle space-y-4">
        <div className="flex items-start justify-between">
          <div className="p-3 bg-rose-100 text-rose-600 rounded-full">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-surface-dark">Delete Job?</h3>
          <p className="text-sm text-slate-500 mt-1">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-surface-dark">
              "{itemName}"
            </span>
            ?
          </p>
          <p className="text-xs text-rose-600 mt-2 font-medium">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-border-subtle text-slate-600 font-medium text-sm rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            Delete {itemType}
          </button>
        </div>
      </div>
    </div>
  );
};
