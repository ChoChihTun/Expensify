import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ACTIONS GENERATORS => dispatched to ALL reducers

// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 }) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});
// REMOVE_EXPENSE
const removeExpense = ({ id = 0 }) => ({
  type: 'REMOVE_EXPENSE',
  id
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
// SET_TEXT_FILTER
const setTextFilter = (text = '')  => ({
  type: 'SET_TEXT_FILTER',
  text
});
// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});
// SET_START_DATE
const setStartDate = (date = undefined) => ({
  type: 'SET_START_DATE',
  date
});
// SET_END_DATE
const setEndDate = (date = undefined) => ({
  type: 'SET_END_DATE',
  date
});

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]; //Cannot use push as it voilates the pure function rule
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => (id !== action.id));
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      });
    default:
      return state;
  };
};

// Filter Reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.date
      }

    default:
      return state;
  };
};

// Store creation by combining multiple reducers
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300 }));

store.dispatch(removeExpense({ id: expenseOne.expense.id }));

store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
store.dispatch(setStartDate());

store.dispatch(setEndDate(1250));
store.dispatch(setEndDate());

const demoState = {
  expenses: [{
    id: 'asdafsdf',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 8
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};

