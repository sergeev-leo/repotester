import {connect} from 'react-redux';
import * as Actions from './actions.js';
import LoadButton from './LoadButton.jsx';


const mapStateToLoadButtonProps = (state) => {
	return	{
				url: state.dateToSearch/1000,
				isVisible: state.isVisible
			}
		};

const mapDispatchToLoadButtonProps = (dispatch, ownProps) => {
	return { 
				fetchQuestions: url => dispatch(Actions.fetchQuestions(url))
			} 
};

const mergeProps = (stateProps, dispatchProps, ownProps ) => {
	return {
		...stateProps,
		...ownProps,
		onClick: () => dispatchProps.fetchQuestions(stateProps.url)	
	}
}

export default connect(mapStateToLoadButtonProps,mapDispatchToLoadButtonProps,mergeProps)(LoadButton);