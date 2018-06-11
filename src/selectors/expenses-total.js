import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';

export const getExpensesTotal = (props) => {
    const amountArray = props.expenses.map((expense) => expense.amount);
    const reducer = (accumulator, currentAmount) => accumulator + currentAmount;

    // 0 is the default when undefined or empty array
    return amountArray.reduce(reducer, 0);
};

const mapStateToProps = (state) => {
  // Return the props
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(getExpensesTotal);