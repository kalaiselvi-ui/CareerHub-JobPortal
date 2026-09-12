// utils/calculateExperience.ts
export interface Experience {
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
}

export const calculateTotalExperience = (
  experiences: Experience[] = [],
): string => {
  if (!experiences.length) return "0 yrs";

  let totalMonths = 0;

  experiences.forEach((exp) => {
    const start = new Date(exp.startDate);
    const end =
      exp.isCurrent || !exp.endDate ? new Date() : new Date(exp.endDate);

    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      totalMonths += Math.max(0, months);
    }
  });

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  if (years === 0) return `${remainingMonths} mos`;
  if (remainingMonths === 0) return `${years} yrs`;
  return `${years} yrs ${remainingMonths} mos`;
};
