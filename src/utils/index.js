export * from "./middleware";

export function formatUTCDate(date) {
  return new Date(date).toLocaleString();
}
