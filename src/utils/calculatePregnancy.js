export const getDaysRemaining = (expectedDate) => {
  if (!expectedDate) return 0;
  const today = new Date();
  const dueDate = new Date(expectedDate);
  const diffTime = dueDate - today;
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
};
