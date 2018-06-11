export default (expenses = []) => {
    const amountArray = expenses.map((expense) => expense.amount);
    const reducer = (accumulator, currentAmount) => accumulator + currentAmount;

    // 0 is the default when undefined or empty array
    return amountArray.reduce(reducer, 0);
};
