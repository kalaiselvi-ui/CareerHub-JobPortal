interface SummaryCardProps {
  title: string;
  count: number;
  subtitle: string;
  icon: React.ElementType;
  iconColorClass: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  count,
  subtitle,
  icon: Icon,
  iconColorClass,
}) => (
  <div className="bg-white p-5 rounded-xl border border-border-subtle shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="space-y-1">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-surface-dark">{count}</h3>
      <p className="text-xs text-slate-400">{subtitle}</p>
    </div>
    <div className={`p-3 rounded-xl ${iconColorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);
