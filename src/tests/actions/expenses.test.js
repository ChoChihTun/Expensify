import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';
import moment from 'moment';

// Pass in middleware
const createMockStore = configureMockStore([thunk]);

// Reset the store for every test case
beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    // Same as expensesData.id
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref('expenses').set(expensesData).then(() => done());
});

test('Should set up remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove expenses from firebase', (done) => {
  const store = createMockStore();
  const id = expenses[0].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    
    return database.ref(`expenses/${id}`).once('value')
  }).then((snapshot) => {
    // val() on value that doesnt exist returns null so we check using toBeFalsy()
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('Should set up edit expense action object', () => {
  const action = editExpense('abc123', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'abc123',
    updates: {
      note: 'New note value'
    }
  });
});

test('Should set up add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

// Test case will only be successful/finish when we call done
test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  // We only want to assert after we run dispatch but we're using promise/async operation --> we do promise chaining to force jest to wait
  // Add return to database.ref('expenses').push(expense).then((ref) => {.... })=> So that we can chain with then here
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();

    // Assert that we dispatch into store correctly
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    // Assert that we saved into database correctly
    //Return to the next promise in the chain
    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const defaultExpenseData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  }
  // We only want to assert after we run dispatch but we're using promise/async operation --> we do promise chaining to force jest to wait
  // Add return to database.ref('expenses').push(expense).then((ref) => {.... })=> So that we can chain with then here
  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();

    // Assert that we dispatch into store correctly
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultExpenseData
      }
    });

    // Assert that we saved into database correctly
    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultExpenseData);
    done();
  });
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});


/* 
test('Should set up add expense action object with default values', () => {
  const action = addExpense(); // Can do this when export const addExpense = ({ description = "", note = '', amount = 0, createdAt = 0 } = {}). If not we need to pass an empty object(i.e. addExpense({}) ) to prevent error.
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  });
}); */