import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('should not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = {
    id: '4',
    description: 'Test',
    note: '',
    amount: 12345,
    createdAt: 1000
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ ...expenses, expense ])
});

test('should edit an expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      description: 'testing id 1'
    }
  };
  const state = expensesReducer(expenses, action);
  const updatedState = [ {...expenses[0], description: 'testing id 1'}, expenses[1], expenses[2]];
  expect(state).toEqual(updatedState);
});

test('should not edit expenses if not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '4',
    updates: {
      description: 'testing id 4'
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: expenses
  }
  const initialState = [{
    id: '1',
    description: 'Test1',
    note: '',
    amount: 123,
    createdAt: 0
  }, {
    id: '2',
    description: 'Test2',
    note: '',
    amount: 321123,
    createdAt: 1000
  }];

  const state = expensesReducer(initialState, action);
  expect(state).toEqual(expenses);
});
