export * from "./middleware";

export function formatUTCDate(date) {
  return new Date(date).toLocaleString();
}

export function capitalize(string) {
  if(!string) return;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
