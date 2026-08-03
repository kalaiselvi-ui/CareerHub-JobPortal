import React from "react";
import { MapPin, Briefcase, ChevronRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Company } from "../../type/companies.type.ts";

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <div className="group bg-white rounded-xl border border-border-subtle p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start gap-4">
          {company.logo ? (
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-slate-100 border border-border-subtle shrink-0 flex items-center justify-center text-slate-400">
              <Building2 className="w-6 h-6" />
            </div>
          )}
          <div>
            <h3 className="font-bold text-surface-dark text-lg group-hover:text-primary transition-colors">
              {company.name}
            </h3>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-primary">
              {company.industry}
            </span>
          </div>
        </div>

        <p className="text-slate-600 text-sm mt-4 line-clamp-2 leading-relaxed">
          {company.description}
        </p>
      </div>

      <div>
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-surface-light shrink-0" />
            <span className="truncate">{company.location}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-surface-dark shrink-0">
            <Briefcase className="w-4 h-4 text-primary shrink-0" />
            <span>
              {company.openJobsCount}{" "}
              {company.openJobsCount === 1 ? "Open Job" : "Open Jobs"}
            </span>
          </div>
        </div>

        <Link
          to={`/companies/${company.id}`}
          className="mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-slate-50 hover:bg-primary text-surface-dark hover:text-white font-medium rounded-xl text-sm transition-all border border-border-subtle hover:border-primary"
        >
          <span>View Company</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
