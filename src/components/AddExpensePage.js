import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = (props) => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm 
      onSubmit={(expense) => {
        // Connect and update the redux store
        props.dispatch(addExpense(expense));
        props.history.push('/'); // Switch page using browser routing --> No full page reload
      }}
    />
  </div>
);

export default connect()(AddExpensePage);