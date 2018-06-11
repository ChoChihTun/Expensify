import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummary correctly', () => {
  const wrapper = shallow(<ExpensesSummary expenses={expenses}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render 1 expense correctly', () => {
  const wrapper = shallow(<ExpensesSummary expenses={[ expenses[0] ]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render multiple expenses correctly', () => {
  const wrapper = shallow(<ExpensesSummary expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});