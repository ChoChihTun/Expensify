import { createStore } from 'redux';

// Empty object as the default --> we cannot access undefine (payload.incrementBy), will get error
// Passed object as argument can be destructured and given a default value
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy //Treat it like incrementBy: value
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
})

const setCount = ({ count } = {}) => ({
  type: 'SET',
  count
})

const reset = () => ({
  type: 'RESET',
});

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy,
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
  };
};

// Set up default in the argument
const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// I'd like to increment the count
store.dispatch(incrementCount({ incrementBy: 5 }));

// I'd like to increment the count
store.dispatch(incrementCount());

// I'd like to decrement the count
store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(reset());

store.dispatch(setCount({ count: 101 }));

