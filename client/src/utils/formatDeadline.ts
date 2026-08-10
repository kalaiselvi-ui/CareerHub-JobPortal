export function formatDeadline(dateString?: string) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  // If dateString is relative (e.g. "2 hours ago"), preserve it as fallback
  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
