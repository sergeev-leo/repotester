import { connect } from 'react-redux';
import { updateOrder, updateRating } from './actions';
import dnd from './Dnd';

const mapStateToListProps = state => ({
  list: state.fetchedData,
  isFetching: state.isFetching,
  isFetched: !!state.fetchedData,
  fetchError: state.fetchError,
});

const mapDispatchToListProps = {
  updateRating,
  updateOrder,
};

export default connect(mapStateToListProps, mapDispatchToListProps)(dnd);
