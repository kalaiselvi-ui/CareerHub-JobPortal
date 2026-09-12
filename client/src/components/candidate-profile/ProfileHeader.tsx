import { Briefcase, Mail, MapPin, Pencil, Phone } from "lucide-react";
import type { BasicInfoForm } from "../../pages/candidate/Profile.tsx";
import {
  calculateTotalExperience,
  type Experience,
} from "../../utils/calculateExperience.ts";

interface ProfileHeaderProps {
  basicInfo: BasicInfoForm;
  onEdit: () => void;
  experiences?: Experience[]; // <-- Pass experiences as a prop
  completionPercentage: number;
}
const ProfileHeader = ({
  basicInfo,
  completionPercentage,
  experiences = [], // <-- Default to empty array
  onEdit,
}: ProfileHeaderProps) => {
  const totalExperience = calculateTotalExperience(experiences);
  return (
    <div>
      <div className="bg-white rounded-2xl border border-border-subtle p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-blue-100 text-primary font-bold text-2xl flex items-center justify-center border-2 border-white shadow-xs shrink-0">
              {basicInfo.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900">
                  {basicInfo.fullName}
                </h2>
                <button
                  onClick={onEdit}
                  className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                >
                  <Pencil className="w-3 h-3" /> Edit Basic Info
                </button>
              </div>
              <p className="text-sm font-medium text-slate-700">
                {basicInfo.headline}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                {basicInfo.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {basicInfo.location}
                  </span>
                )}
                {basicInfo.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {basicInfo.email}
                  </span>
                )}
                {basicInfo.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {basicInfo.phone}
                  </span>
                )}
                <div className="flex items-center gap-1.5 ">
                  <Briefcase className="w-4 h-4" />
                  <span>{totalExperience} Experience</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto bg-slate-50 p-4 rounded-xl border border-border-subtle flex flex-col justify-center min-w-50">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Profile Completion</span>
              <span className="text-primary">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
