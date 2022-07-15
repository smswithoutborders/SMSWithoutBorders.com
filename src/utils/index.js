export * from "./middleware";

export function formatUTCDate(date) {
  return new Date(date).toLocaleString();
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
