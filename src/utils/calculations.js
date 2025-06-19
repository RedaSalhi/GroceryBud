/**
 * Calculate stats for a list of shopping items.
 * Each item may contain {price, quantity, completed}.
 * @param {Array} items
 * @param {number} budget
 */
export const calculateShoppingStats = (items = [], budget = 0) => {
  const safeItems = Array.isArray(items) ? items : [];
  const totalItems = safeItems.length;
  let completedItems = 0;
  let totalValue = 0;
  let completedValue = 0;

  for (const item of safeItems) {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    const value = price * qty;
    totalValue += value;
    if (item.completed) {
      completedItems += 1;
      completedValue += value;
    }
  }

  const remainingBudget =
    typeof budget === 'number' ? Math.round((budget - completedValue) * 100) / 100 : null;
  const budgetExceeded = remainingBudget !== null ? remainingBudget < 0 : false;

  return {
    totalItems,
    completedItems,
    totalValue: Math.round(totalValue * 100) / 100,
    completedValue: Math.round(completedValue * 100) / 100,
    remainingBudget,
    budgetExceeded,
  };
};

export default { calculateShoppingStats };
