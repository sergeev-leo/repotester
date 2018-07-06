import { connect } from 'react-redux';
import moment from 'moment';
import * as Actions from '../actions/index';
import LoadButton from '../components/LoadButton/LoadButton';

const mapStateToLoadButtonProps = state => ({
  date: moment(state.dateToSearch).format('X'),
  isVisible: state.isVisible,
});

const mapDispatchToLoadButtonProps = (dispatch, ownProps) => ({
  fetchQuestions: date => dispatch(Actions.fetchQuestions(date)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps,
  onClick: () => dispatchProps.fetchQuestions(stateProps.date),
});

export default connect(mapStateToLoadButtonProps, mapDispatchToLoadButtonProps, mergeProps)(LoadButton);
