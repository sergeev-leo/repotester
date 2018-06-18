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
		onClick: url => () => { 	
			dispatch(Actions.fetchQuestions(url))
		} 
	}
};

export default connect(mapStateToLoadButtonProps,mapDispatchToLoadButtonProps)(LoadButton);