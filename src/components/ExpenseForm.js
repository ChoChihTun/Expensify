import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    // Create the state of expense here and any changes will reflect here
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
  }
}

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  }

  onAmountChange = (e) => {
    const amount = e.target.value;
    // d{1,} --> First half MUST be 1 to infinity (cannot start with a dot)
    // !amount allows user to clear the input
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  }

  onDateChange = (createdAt) => {
    if (createdAt) { // Prevents User from clearing the value --> Can only change by clicking the date
      this.setState(() => ({ createdAt }));
    }
  };

  // focused is an object so we destructure to get its value
  onFocusChange = ({focused}) => {
    this.setState(() => ({ calendarFocused: focused }))
  };

  onSubmit = (e) => {
    e.preventDefault(); // Prevent full page refresh

    // Make sure there is description and amount
    if (!this.state.description || !this.state.amount) {
      // Set error state
      this.setState(() => ({ error: 'Please provide description and amount!'}));
    } else {
      this.setState(() => ({ error: '' }));

      // This onSubmit is from EditExpensePage, it contains startEdtiExpense action
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100, //Parse string amount into numerical amount
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      })
    }
  };

  render() {
    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.state.error && <p className='form__error'>{this.state.error}</p>}

        <input className='text-input' text='text' placeholder='Description' autoFocus value={this.state.description} onChange={this.onDescriptionChange}/>
        <input className='text-input' type='text' placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange} />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1 /*Show 1 month when click*/}
          isOutsideRange={() => false /* Make all the dates available */}
        />
        <textarea className='textarea' placeholder='Add a note for your response (Optional)' value={this.state.note} onChange={this.onNoteChange}></textarea>

{/*Put isnside div so button not affected by >* in .form class style */}        
        <div> 
          <button className='button'>Save Expense</button>   
        </div>
      </form>
    )
  }
}