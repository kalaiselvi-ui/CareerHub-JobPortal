import React from "react";
import { Search } from "lucide-react";

export interface FilterState {
  search: string;
  status: string;
  category: string;
}

interface JobFiltersProps {
  filters: FilterState;
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  //   categories: string[];
  showStatusFilter?: boolean; // Optional: hide status on public pages if needed
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onFilterChange,
  //   categories = [],
  showStatusFilter = true,
}) => {
  return (
    <div className="bg-white border border-border-subtle rounded-xl p-4 shadow-sm space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div
          className={
            showStatusFilter
              ? "lg:col-span-2 relative"
              : "lg:col-span-3 relative"
          }
        >
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={onFilterChange}
            placeholder="Search jobs by title or location..."
            className="w-full pl-10 pr-3.5 py-2 bg-white border border-border-subtle rounded-lg text-sm text-surface-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        {/* Status Filter */}
        {showStatusFilter && (
          <div>
            <select
              name="status"
              value={filters.status}
              onChange={onFilterChange}
              className="w-full px-3 py-2 bg-white border border-border-subtle rounded-lg text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer transition-all"
            >
              <option value="All">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        )}
        {/* Category-Wise Filter
        <div>
          <select
            name="category"
            value={filters.category}
            onChange={onFilterChange}
            className="w-full px-3 py-2 bg-white border border-border-subtle rounded-lg text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer transition-all"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div> */}
      </div>
    </div>
  );
};

export default JobFilters;
