import React from "react";
import { MapPin, Briefcase, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Company } from "../../type/companies.type.ts";

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start gap-4">
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
          />
          <div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
              {company.name}
            </h3>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
              {company.industry}
            </span>
          </div>
        </div>

        <p className="text-slate-600 text-sm mt-4 line-clamp-2 leading-relaxed">
          {company.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span>{company.location}</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <Briefcase className="w-4 h-4 text-blue-600" />
          <span>{company.openJobsCount} Open Jobs</span>
        </div>
      </div>

      <Link
        to={`/companies/${company.id}`}
        className="mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium rounded-xl text-sm transition-colors border border-slate-200 hover:border-blue-200"
      >
        <span>View Company</span>
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
