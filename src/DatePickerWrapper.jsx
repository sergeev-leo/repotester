import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DatePickerWrapper extends React.Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		this.props.onChange(this.props.selected);
	}

	render() {
		return <div className="datePicker"><DatePicker onChange={this.props.onChange} selected={this.props.selected}/></div>
	}
}

export default DatePickerWrapper;