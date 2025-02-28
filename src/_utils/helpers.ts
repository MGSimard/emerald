export function formatDate(date: Date | null) {
  if (!date) return "-";

  return date
    .toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
}
