import moment from 'moment';
import * as Actions from './actions';


const mainReducer = function (state = { dateToSearch: moment('2018-01-01'), isVisible: false }, action) {
  switch (action.type) {
    case Actions.DATE_PICKED: {
      if (!action.payload) return state;

      const isVisible = action.payload !== state.lastSearchDate;
      return {
        ...state,
        dateToSearch: moment(action.payload),
        isVisible,
      };
    }
    case Actions.FETCH_QUESTIONS_SUCCESS: {
      const fetchedData = action.payload.json.items;
      return {
        ...state,
        fetchedData,
        lastSearchDate: state.dateToSearch,
        isVisible: false,
        isFetching: false,
      };
    }
    case Actions.FETCH_QUESTIONS_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case Actions.FETCH_QUESTIONS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload.error,
      };
    }

    case Actions.RATING_UPDATE: {
      return {
        ...state,
        fetchedData: state.fetchedData.map(item => (item.question_id === action.payload.id
					 ? { ...item, score: item.score += action.payload.inc ? -1 : 1 }
					 : { ...item })),
      };
    }

    case Actions.ORDER_UPDATE: {
      if (action.payload.isDragged) {
        const { index: newIndex, id } = action.payload.newOrder;
        const currentIndex = state.fetchedData.indexOf(state.fetchedData.filter(item => item.question_id == id)[0]);
        const updatedData = state.fetchedData.slice();
        const element = updatedData.splice(currentIndex, 1);
        updatedData.splice((newIndex), 0, element[0]);
        return {
          ...state,
          fetchedData: updatedData,
        };
      }

      const updatedData = state.fetchedData.slice();
      const [firstIndex, secondIndex] = action.payload.newOrder;
      const firstIndexItem = updatedData[firstIndex];
      updatedData[firstIndex] = updatedData[secondIndex];
      updatedData[secondIndex] = firstIndexItem;
      return {
        ...state,
        fetchedData: updatedData,
      };
    }

    default: return state;
  }
};

export default mainReducer;
