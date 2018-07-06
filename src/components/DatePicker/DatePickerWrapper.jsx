import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePickerWrapper = props => (
  <div className="date-picker">
    <DatePicker
      onChange={props.onChange}
      selected={props.selected}
    />
  </div>
);

export default DatePickerWrapper;
