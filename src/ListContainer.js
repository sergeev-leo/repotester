import { connect } from 'react-redux';
import {updateOrder, updateRating} from './actions.js';
import dnd from './dnd.jsx'

const mapStateToListProps = (state) => {
	return	{
				list: state.fetchedData,
				isFetching: state.isFetching,
				isFetched: !!state.fetchedData 
			}
		};

const mapDispatchToListProps = {
		updateRating,
		updateOrder
};

export default connect(mapStateToListProps,mapDispatchToListProps)(dnd);
