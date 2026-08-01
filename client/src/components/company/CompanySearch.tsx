import React from "react";
import { Search, X } from "lucide-react";

interface CompanySearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const CompanySearch: React.FC<CompanySearchProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search companies by name or industry..."
        className="w-full pl-11 pr-10 py-3.5 bg-white rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 shadow-sm transition-all text-sm sm:text-base"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
