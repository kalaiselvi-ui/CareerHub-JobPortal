import { useState, useMemo } from "react";
import { Plus, Search, Trash2, Folder, Briefcase } from "lucide-react";
import { DeleteModal } from "../../components/DeleteModal.tsx";
import { AddCategoryModal } from "../../components/AddCategoryModal.tsx";
import type { Category } from "../../type/category.type.ts";
import { useCategories } from "../../hooks/useCategories.ts";

import toast from "react-hot-toast";
import { categoryMutation } from "../../mutations/categoriesMutation.ts";

export default function ManageCategories() {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: categories, isLoading } = useCategories();
  const { deleteCategoryMutation } = categoryMutation();

  // Filter Categories
  const filteredCategories = useMemo(() => {
    if (!categories?.category) return [];

    return categories.category.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [categories, searchQuery]);

  // Handle Delete Confirmation
  const handleConfirmDelete = async () => {
    if (!deletingCategory) return;

    deleteCategoryMutation.mutate(deletingCategory._id, {
      onSuccess: () => {
        toast.success("Category Deleted Successfully");
        setDeletingCategory(null);
      },
      onError: (error) => {
        toast.error(error.message || "failed to delete");
      },
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-dark">
            Manage Categories
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage job categories available on the platform.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* 2. Search Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark"
          />
        </div>
      </div>

      {/* 3. Categories Grid */}
      {isLoading ? (
        <div className="py-16 text-center text-gray-500 bg-white rounded-xl border border-border-subtle">
          Loading categories...
        </div>
      ) : filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat._id}
              className="group relative bg-white p-5 rounded-xl border border-border-subtle shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 bg-blue-50 text-primary rounded-xl shrink-0">
                    <Folder className="w-5 h-5" />
                  </div>

                  <button
                    onClick={() => setDeletingCategory(cat)}
                    title="Delete Category"
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    slug: {cat.slug}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5 font-medium text-gray-600">
                  <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                  {cat.jobCount ?? 0} {cat.jobCount === 1 ? "job" : "jobs"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-xl border border-border-subtle text-gray-500">
          <p className="font-medium text-base">
            {searchQuery
              ? "No categories match your search."
              : "No categories found."}
          </p>
        </div>
      )}

      {/* Modals */}
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <DeleteModal
        isOpen={Boolean(deletingCategory)}
        itemName={deletingCategory?.name || ""}
        itemType="Category"
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
