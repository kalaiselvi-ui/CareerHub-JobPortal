import React from "react";
import {
  Laptop,
  Activity,
  DollarSign,
  GraduationCap,
  Megaphone,
  ShoppingBag,
  Factory,
  Hotel,
} from "lucide-react";
import type { IndustryCategory } from "../../type/companies.type.ts";

const iconMap: Record<string, React.ElementType> = {
  Laptop,
  Activity,
  DollarSign,
  GraduationCap,
  Megaphone,
  ShoppingBag,
  Factory,
  Hotel,
};

interface IndustryCardProps {
  category: IndustryCategory;
  isSelected: boolean;
  onSelect: (industryName: string) => void;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  const IconComponent = iconMap[category.iconName] || Laptop;

  return (
    <button
      onClick={() => onSelect(category.name)}
      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
        isSelected
          ? "bg-blue-50 border-primary ring-2 ring-primary/20 shadow-sm"
          : "bg-white border-border-subtle hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <div
        className={`p-2.5 rounded-lg w-fit mb-3 ${isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}
      >
        <IconComponent className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-semibold text-surface-dark text-sm sm:text-base">
          {category.name}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {category.companyCount} Companies
        </p>
      </div>
    </button>
  );
};
