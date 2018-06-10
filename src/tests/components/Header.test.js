// react-test-renderer
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow'; // shallow will not include children
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const renderer = new ReactShallowRenderer();
  // Actual snapshot of Header. If no snapshot, a new one will be created
  renderer.render(<Header />);
  // Match the actual snapshot with the saved snapshot.
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});