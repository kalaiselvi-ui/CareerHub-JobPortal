import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Briefcase,
  GraduationCap,
  Building2,
  ArrowUpDown,
  RotateCcw,
  Search,
} from "lucide-react";

export const TopFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Keep a local text state for search input typing smoothness
  const [searchText, setSearchText] = useState(
    searchParams.get("search") || "",
  );

  // Sync input text if URL parameters change externally (e.g. Back/Forward button)
  useEffect(() => {
    setSearchText(searchParams.get("search") || "");
  }, [searchParams]);

  // Helper to update individual URL query params
  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === "all" || value === "any" || value === "recent") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("search", searchText);
  };

  const handleClearFilters = () => {
    setSearchText("");
    setSearchParams({}); // Clears all query parameters from URL
  };

  return (
    <div className="w-full bg-surface-light py-4 px-4 sm:px-6 lg:px-8 border-b border-border-subtle">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Search Bar Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center justify-center mx-auto bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm w-full max-w-lg transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search job title..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm text-surface-dark placeholder:text-gray-400 focus:outline-none bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
            {/* Job Type */}
            <div className="relative">
              <Briefcase className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={searchParams.get("jobType") || "all"}
                onChange={(e) => updateParam("jobType", e.target.value)}
                className="pl-9 pr-8 py-2 bg-white border border-border-subtle text-surface-dark rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none"
              >
                <option value="all">All Jobs</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            {/* Experience Level */}
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={searchParams.get("experienceLevel") || "any"}
                onChange={(e) => updateParam("experienceLevel", e.target.value)}
                className="pl-9 pr-8 py-2 bg-white border border-border-subtle text-surface-dark rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none"
              >
                <option value="any">Any Experience</option>
                <option value="entry level">Entry Level</option>
                <option value="mid level">Mid Level</option>
                <option value="senior level">Senior Level</option>
              </select>
            </div>

            {/* Work Mode */}
            <div className="relative">
              <Building2 className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={searchParams.get("workMode") || "all"}
                onChange={(e) => updateParam("workMode", e.target.value)}
                className="pl-9 pr-8 py-2 bg-white border border-border-subtle text-surface-dark rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none"
              >
                <option value="all">All Modes</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="on-site">On-site</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="relative">
              <ArrowUpDown className="w-4 h-4 text-surface-dark/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={searchParams.get("sortBy") || "recent"}
                onChange={(e) => updateParam("sortBy", e.target.value)}
                className="pl-9 pr-8 py-2 bg-white border border-border-subtle text-surface-dark rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none"
              >
                <option value="recent">Most Recent</option>
                <option value="relevance">Relevance</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearFilters}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-surface-dark/70 hover:text-secondary hover:bg-secondary/10 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopFilters;
