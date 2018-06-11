import expenses from '../fixtures/expenses';
import { getExpensesTotal }from '../../selectors/expenses-total';

test('should return 0 if no expenses', () => {
  const result = getExpensesTotal({ expenses: []});
  expect(result).toBe(0);
});

test('should add up a single expense', () => {
  const singleExpense = [expenses[0]];
  const result = getExpensesTotal({ expenses: singleExpense });
  expect(result).toBe(195);
});

test('should add up multiple expenses', () => {
  const result = getExpensesTotal({ expenses });
  expect(result).toBe(114195);
})