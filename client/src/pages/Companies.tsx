import React, { useState, useMemo } from "react";

import { Building2, RefreshCw } from "lucide-react";
import { MOCK_COMPANIES, MOCK_INDUSTRIES } from "../data/companyData.ts";
import { IndustryCard } from "../components/company/IndustryCard.tsx";
import { CompanyCard } from "../components/company/CompanyCard.tsx";
import { CompanySearch } from "../components/company/CompanySearch.tsx";

export const Companies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const filteredCompanies = useMemo(() => {
    return MOCK_COMPANIES.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = selectedIndustry
        ? company.industry.toLowerCase() === selectedIndustry.toLowerCase()
        : true;

      return matchesSearch && matchesIndustry;
    });
  }, [searchTerm, selectedIndustry]);

  const handleIndustrySelect = (industryName: string) => {
    setSelectedIndustry((prev) =>
      prev === industryName ? null : industryName,
    );
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedIndustry(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-surface-dark tracking-tight">
            Explore Companies
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Discover companies, explore opportunities, and find the right place
            to grow your career.
          </p>
          <div className="pt-4">
            <CompanySearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>

        {/* Industry Categories */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-surface-dark">
              Popular Industries
            </h2>
            {selectedIndustry && (
              <button
                onClick={() => setSelectedIndustry(null)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Clear Industry Filter
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {MOCK_INDUSTRIES.map((category) => (
              <IndustryCard
                key={category.id}
                category={category}
                isSelected={selectedIndustry === category.name}
                onSelect={handleIndustrySelect}
              />
            ))}
          </div>
        </div>

        {/* Companies Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <h2 className="text-xl font-bold text-surface-dark">
              Featured Employers
            </h2>
            <span className="text-sm font-medium text-slate-500">
              Showing {filteredCompanies.length} companies
            </span>
          </div>

          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-xl border border-border-subtle p-12 text-center space-y-4 max-w-md mx-auto my-8">
              <div className="p-3 bg-slate-100 rounded-full w-fit mx-auto text-slate-400">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-surface-dark">
                No companies found
              </h3>
              <p className="text-sm text-slate-500">
                We couldn't find any companies matching your search filters. Try
                resetting your search query.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Companies;
