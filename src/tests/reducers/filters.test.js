import filterReducer from '../../reducers/filters';
import moment from 'moment';

test('should set up default filter values', () => {
  const state = filterReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')   
  });
});

test('should set sortBy to amount', () => {
  const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  // Don't use the default state or else we wont see the change as default sortBy is already date
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filterReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
  const action = {
    type: 'SET_TEXT_FILTER',
    text: 'abc123'
  };
  const state = filterReducer(undefined, action);
  expect(state.text).toBe('abc123');
});

test('should set startDate filter', () => {
  const date = moment(0).subtract(2, 'days');
  const action = {
    type: 'SET_START_DATE',
    date
  };
  const state = filterReducer(undefined, action);
  expect(state.startDate).toBe(date);
});

test('should set endDate filter', () => {
  const date = moment(0).add(2, 'days');
  const action = {
    type: 'SET_END_DATE',
    date
  };
  const state = filterReducer(undefined, action);
  expect(state.endDate).toBe(date);
});