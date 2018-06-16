import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { logIn, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

/* store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses);
});
 */

// Provider's store is the name of our store
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
// Only render when page has not been rendered to make code more efficient
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// Call when user goes from authenticated to unauthenticated or vice versa
firebase.auth().onAuthStateChanged((user) => {
  // NOTE: We dispatch logIn and logout here instead of inside startLogIn and startLogout because we want to update the store immediately when user first visit the page instead of only update when user click login/logout button
  if (user) {
    store.dispatch(logIn(user.uid));
    // Only fetch data ONLY when user log in
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      // Get the path of the current page that user is at
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();    
    history.push('/');
  }
});