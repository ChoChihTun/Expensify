import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { removeExpense, editExpense } from '../actions/expenses';

const EditExpensePage = (props) => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={(expense) => {
        props.dispatch(editExpense(props.expense.id, expense));
        props.history.push('/');
      }}
    />
    <button onClick={() => {
      props.dispatch(removeExpense({ id: props.expense.id }));
      props.history.push('/');
    }}>Remove
    </button>
  </div>
);

// props in the args is the info that is passed from the ExpenseListItem page
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => (expense.id === props.match.params.id))
  }
}

// Need to connect to Redux store to find the specific expense
// Need to retrieve data so we need to map state to props
export default connect(mapStateToProps)(EditExpensePage);