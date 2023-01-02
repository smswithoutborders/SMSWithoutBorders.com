export * from "./middleware";
export * from "./constants";

export function formatUTCDate(date) {
  return new Date(date).toLocaleString();
}
