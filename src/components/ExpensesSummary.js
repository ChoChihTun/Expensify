import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
  const count = props.expenses.length;
  const total = numeral(selectExpensesTotal(props.expenses) / 100).format('$0,0.00');
  return (
    <div>
      <h3>Expenses Summary</h3>
      {
        (count === 1 || count === 0) ? (
          <p>{`Viewing ${count} expense totalling ${total}`}</p>
        ) : (
          <p>{`Viewing ${count} expenses totalling ${total}`}</p>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  // Return the props
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);