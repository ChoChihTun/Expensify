// Get visible expenses
export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    // Date !== 'number' so that the date can be undefined and will have not an impact on our search
    const startDateMatch = typeof startDate  !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
    // Sort
}).sort((a, b) => {
  if (sortBy === 'date') {
    return a.createdAt < b.createdAt;
  } else if (sortBy === 'amount') {
    return a.amount < b.amount;
  }
});
};
