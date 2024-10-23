export const formatDate = (
  dateString,
  options = { year: "numeric", month: "long", day: "numeric" }
) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString(undefined, options);
};
