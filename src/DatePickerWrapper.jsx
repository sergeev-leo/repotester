import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DatePickerWrapper extends React.Component {
  render() {
    return (
      <div className="date-picker">
        <DatePicker
          onChange={this.props.onChange}
          selected={this.props.selected}
        />
      </div>
    );
  }
}

export default DatePickerWrapper;
