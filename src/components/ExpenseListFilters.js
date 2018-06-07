import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate } from '../actions/filters';

const ExpenseListFilters = (props) => (
  <div>
    <input type="text" value={props.filters.text} onChange={(e) => {
      props.dispatch(setTextFilter(e.target.value));
    }} />
    <select value={props.filters.sortBy} onChange={(e) => {
      if (e.target.value === 'date') {
        props.dispatch(sortByDate());
      } else {
        props.dispatch(sortByAmount());
    }}} >
      <option value='date'>Date</option>
      <option value='amount'>Amount</option>
    </select>
  </div>
);
// Need onChange because if we set value, the textbox will change into read only
// e.target --> <input type='text value='USERINPUT'>

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps)(ExpenseListFilters);