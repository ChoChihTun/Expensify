import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div className='content-container'>
    <div className='list-header'>
      <div className='show-for-mobile'>Expenses</div>
      <div className='show-for-desktop'>Expense</div>
      <div className='show-for-desktop'>Amount</div>
    </div>
    <div className='list-body'>
      {
        props.expenses.length === 0 ? (
          <div className='list-item list-item--message'>
            <span>No expenses</span>
          </div>
        ) : (
          props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense } />
          })
        )
      }    
    </div>

  </div>
);

/* Another Way
const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
      {props.expenses.map((expense) => (
        <div key={expense.id}>
          {ExpenseListItem(expense)}
        </div>
      ))}
  </div>
); */

const mapStateToProps = (state) => {
  // Return the props
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
// connect(mapStateToProps) returns a function --> Connect React to Redux store
// This function is like the higher order component function --> We just need to pass the child component inside as argument

/* Same As:
const ConnectedExpenseList = connect((state) => {
  // Return the props
  return {
    expenses: state.expenses
  };
})(ExpenseList);

export default ConnectedExpenseList
*/