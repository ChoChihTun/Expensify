import { createStore } from 'redux';

// Set up default in the argument
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy,
      };
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy,
      }
    case 'RESET':
      return {
        count: 0
      }
    case 'SET':
      return {
        count: action.count
      }
    default:
      return state;
  }
});

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// I'd like to increment the count
store.dispatch({
  type: 'INCREMENT', // Coding Convention to put CAPITAL and separate words using underscore
  incrementBy: 5 // Passing dynamic data to action obj
});

// I'd like to increment the count
store.dispatch({
  type: 'INCREMENT' // Coding Convention to put CAPITAL and separate words using underscore
});

// I'd like to decrement the count
store.dispatch({
  type: 'DECREMENT'
});

store.dispatch({
  type: 'DECREMENT',
  decrementBy: 10,
})

store.dispatch({
  type: 'RESET'
});

store.dispatch({
  type: 'SET',
  count: 101
})

