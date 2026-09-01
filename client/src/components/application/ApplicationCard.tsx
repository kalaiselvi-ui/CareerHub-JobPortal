import React from "react";
import { Eye, MapPin, Calendar, Briefcase } from "lucide-react";
import type { Application } from "../../type/application.type.ts";
import StatusBadge from "../dashboard/common/StatusBadge.tsx";

interface ApplicationCardProps {
  application: Application;
  onView: (application: Application) => void;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onView,
}) => {
  const visibleSkills = application.skills.slice(0, 3);
  const remainingSkills = application.skills.length - visibleSkills.length;

  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-5 transition-shadow hover:shadow-md flex flex-col justify-between space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start space-x-3">
          {application.avatar ? (
            <img
              src={application.avatar}
              alt={application.candidateName}
              className="w-12 h-12 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-lg">
              {application.candidateName.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground leading-tight">
              {application.candidateName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {application.headline}
            </p>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              {application.location}
            </div>
          </div>
        </div>

        <StatusBadge status={application.status} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm pt-2 border-t border-border">
        <div className="flex items-center text-muted-foreground">
          <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-foreground font-medium">
            {application.jobTitle}
          </span>
        </div>
        <div className="flex items-center text-muted-foreground sm:justify-end">
          <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
          <span>Applied {application.appliedAt}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-wrap gap-1.5">
          {visibleSkills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {remainingSkills > 0 && (
            <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs font-medium">
              +{remainingSkills}
            </span>
          )}
        </div>
        <button
          onClick={() => onView(application)}
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs font-medium transition-colors"
        >
          <span>View Application</span>
          <Eye className="w-3.5 h-3.5 ml-1" />
        </button>
      </div>
    </div>
  );
};
