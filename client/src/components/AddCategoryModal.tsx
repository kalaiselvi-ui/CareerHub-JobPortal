import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { categoryMutation } from "../mutations/categoriesMutation.ts";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Optional callback after category is added
}

export function AddCategoryModal({
  isOpen,
  onClose,
  onSuccess,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const { createCategoryMutation } = categoryMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents bubbling up to any parent form
    if (!name) return;
    createCategoryMutation.mutate(name, {
      onSuccess: () => {
        toast.success("Category Created Successfully");
        handleClose();
        onSuccess?.();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            error.message ||
            "Failed to create category",
        );
      },
    });
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <h2 className="text-lg font-semibold text-surface-dark">
            Add New Category
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category Name
            </label>
            <input
              id="name"
              type="text"
              required
              autoFocus
              placeholder="e.g. Artificial Intelligence"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createCategoryMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50 rounded-lg transition-colors"
            >
              {createCategoryMutation.isPending ? "Saving..." : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
