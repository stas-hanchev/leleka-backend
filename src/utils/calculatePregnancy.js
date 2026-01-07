export const getPregnancyStats = (dueDate) => {
  if (!dueDate) return { currentWeek: 1, daysRemaining: 280 };

  const today = new Date();
  const expectedDate = new Date(dueDate);

  const diffTime = expectedDate - today;
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const totalPregnancyDays = 280;
  const daysPassed = totalPregnancyDays - daysRemaining;
  const currentWeek = Math.min(42, Math.max(1, Math.ceil(daysPassed / 7)));

  return { currentWeek, daysRemaining };
};
