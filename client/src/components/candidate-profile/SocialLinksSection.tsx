import { Globe, Pencil } from "lucide-react";
import type { SocialLinksForm } from "../../pages/candidate/Profile.tsx";

interface SocialLinkProps {
  socialLinks: SocialLinksForm;
  isOpen: () => void;
}

const SocialLinksSection = ({ socialLinks, isOpen }: SocialLinkProps) => {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-border-subtle p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <h3 className="text-base font-semibold text-slate-900">
            Professional Links
          </h3>
          <button
            onClick={isOpen}
            className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border-subtle bg-slate-50/50">
            {/* <Linkedin className="w-4 h-4 text-blue-600 shrink-0" /> */}
            <div className="overflow-hidden">
              <p className="text-xs text-slate-400 font-medium">LinkedIn</p>
              <p className="text-xs text-slate-700 font-medium truncate">
                {socialLinks.linkedin || "Not added"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border border-border-subtle bg-slate-50/50">
            {/* <Github className="w-4 h-4 text-slate-800 shrink-0" /> */}
            <div className="overflow-hidden">
              <p className="text-xs text-slate-400 font-medium">GitHub</p>
              <p className="text-xs text-slate-700 font-medium truncate">
                {socialLinks.github || "Not added"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border border-border-subtle bg-slate-50/50">
            <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="overflow-hidden">
              <p className="text-xs text-slate-400 font-medium">Portfolio</p>
              <p className="text-xs text-slate-700 font-medium truncate">
                {socialLinks.portfolio || "Not added"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksSection;
