import React from 'react';
import { connect } from 'react-redux'; //Need to check the store to see if user is authenticated
import Header from '../components/Header';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component, //component is passed from AppRouter
  ...rest //Destructure rest of the things that are not destructure
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <div>
        <Header />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to='/' />
    )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);