import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

// props is passed in and we just destructure it straightaway
export const LoginPage = ({ startLogin }) => (
  <div>
    <button onClick={startLogin}>Login</button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);