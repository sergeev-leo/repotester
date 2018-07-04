import { connect } from 'react-redux';
import moment from 'moment';
import * as Actions from './actions';
import DatePickerWrapper from './DatePickerWrapper';

const mapStateToDatePickerProps = state => ({
  selected: moment(state.dateToSearch),
});

const mapDispatchToDatePickerProps = (dispatch, ownProps) => ({
  onChange: (date) => {
    dispatch(Actions.pickDate(date));
  },
});
export default connect(mapStateToDatePickerProps, mapDispatchToDatePickerProps)(DatePickerWrapper);
