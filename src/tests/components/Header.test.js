// react-test-renderer
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();

  // expect(wrapper.find('h1').text()).toBe('Expensify');
/* const renderer = new ReactShallowRenderer();
  // Actual snapshot of Header. If no snapshot, a new one will be created
  renderer.render(<Header />);
  // Match the actual snapshot with the saved snapshot.
  expect(renderer.getRenderOutput()).toMatchSnapshot();  */
});