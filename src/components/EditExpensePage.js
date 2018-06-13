import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startRemoveExpense, startEditExpense } from '../actions/expenses';


export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    // Last called with here
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onClick = () => {
    // Last called with here
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  }

  // Pass startEditExpense and startRemoveExpense actions to ExpenseForm
  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onClick}>Remove</button>
      </div>
    )
  }
}

// props in the args is the info that is passed from the ExpenseListItem page
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => (expense.id === props.match.params.id))
  }
};

// Need props so we dont overwrite existing props
const mapDispatchToProps = (dispatch, props) => {
  return {
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: ({id}) => dispatch(startRemoveExpense({id}))
  }
};
// Need to connect to Redux store to find the specific expense
// Need to retrieve data so we need to map state to props
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);