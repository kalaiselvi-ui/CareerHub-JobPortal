export function formatDeadline(dateString: string) {
  if (!dateString) return "Not specified";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Not specified";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
