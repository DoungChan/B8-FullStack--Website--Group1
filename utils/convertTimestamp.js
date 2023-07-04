export function convertTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleString("en-US", options);
}
