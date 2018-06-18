import { connect } from 'react-redux';
import * as Actions from './actions.js';
import DatePickerWrapper from './DatePickerWrapper.jsx';
import moment from 'moment';

		const mapStateToDatePickerProps = (state) => {
			return	{
						selected: moment(state.dateToSearch)
					}
				};

		const mapDispatchToDatePickerProps = (dispatch, ownProps) => {
			return {
				onChange: (date) => {
					dispatch(Actions.pickDate(date))
				}
			}
		};

export default connect(mapStateToDatePickerProps,mapDispatchToDatePickerProps)(DatePickerWrapper);