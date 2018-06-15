import React from 'react';
import { connect } from 'react-redux'; //Need to check the store to see if user is authenticated
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  component: Component, //cmponent is passed from AppRouter
  ...rest //Destructure rest of the things that are not destructure
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <Redirect to='/dashboard' />
    ) : (
      <div>
        <Component {...props} />
      </div>
    )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);