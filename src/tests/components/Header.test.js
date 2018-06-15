// react-test-renderer
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();

  // expect(wrapper.find('h1').text()).toBe('Expensify');
/* const renderer = new ReactShallowRenderer();
  // Actual snapshot of Header. If no snapshot, a new one will be created
  renderer.render(<Header />);
  // Match the actual snapshot with the saved snapshot.
  expect(renderer.getRenderOutput()).toMatchSnapshot();  */
});

test('should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout} />);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenLastCalledWith();
});