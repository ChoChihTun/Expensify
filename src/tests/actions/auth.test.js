import { logIn, logout } from '../../actions/auth';

test('should set up login action object correctly', () => {
  const uid = 'abc123';
  const action = logIn(uid);
  expect(action).toEqual({
    type:'LOGIN',
    uid
  });
});

test('should set up logout action object correctly', () => {
  const action = logout();
  expect(action).toEqual({
    type:'LOGOUT',
  });
});
