import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
  const count = props.expenses.length;
  const total = numeral(selectExpensesTotal(props.expenses) / 100).format('$0,0.00');
  return (
    <div className='page-header'>
    <div className='content-container'>
      {
        (count === 1 || count === 0) ? (
          <h1 className='page-header__title'>Viewing <span>{count}</span> expense totalling <span>{total}</span></h1>
        ) : (
          <h1 className='page-header__title'>Viewing <span>{count}</span> expenses totalling <span>{total}</span></h1>
        )
      }        
      <div className='page-header__actions'>
        <Link className='button' to='/create'>Add Expense</Link>
      </div>
    </div>
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