import { connect } from 'react-redux';
import * as Actions from './actions.js';
import dnd from './dnd.jsx'

const mapStateToListProps = (state) => {
	return	{
				list: state.fetchedData,
				isFetched: !!state.fetchedData 
			}
		};

const mapDispatchToListProps = (dispatch) => {
	return {
		updateRating: (id, inc) => dispatch(Actions.updateRating(id, inc)),
		updateOrder: (isDragged, newOrder) => dispatch(Actions.updateOrder(isDragged, newOrder))
	}
};

export default connect(mapStateToListProps,mapDispatchToListProps)(dnd);
