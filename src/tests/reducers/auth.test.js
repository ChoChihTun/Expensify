import authReducer from '../../reducers/auth';

test('should log in correctly', () => {
  const action = {
    type: 'LOGIN',
    uid: 'abc123'
  };
  const state = authReducer(undefined, action);
  expect(state).toEqual({
    uid: 'abc123'
  });
});

test('should logout correctly', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({ uid: 'anything' }, action);
  expect(state).toEqual({});
});