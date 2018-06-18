import * as Actions from './actions.js';
import moment from 'moment';
import update from 'immutability-helper';


const mainReducer  =  function(state = {dateToSearch: moment('2018-01-01'), isVisible:false}, action) {
	switch(action.type)
	{
		case Actions.DATE_PICKED: {
			if(!action.payload) return state;

			const isVisible = (action.payload/1000 === state.lastSearchDate/1000) ? false : true;
			let changes = {
				dateToSearch: moment(action.payload), 
				isVisible
			}
			const newState = Object.assign({}, state, changes);
			return newState
		}
		case Actions.FETCH_QUESTIONS_SUCCESS: {
			const fetchedData = action.payload.json.items.splice(0,5);
			let changes = {
				fetchedData, 
				lastSearchDate:state.dateToSearch, 
				isVisible:false
			}
			const newState = Object.assign({}, state, changes);
			return newState;
		}
		case Actions.FETCH_QUESTIONS_REQUEST: {
			console.log('trying');
			return state;
		}

		case Actions.RATING_UPDATE: {
			const updatedData = state.fetchedData.slice();
			updatedData.map( item => {
				if(item.question_id === action.payload.id){
					item.score += action.payload.inc ? 1 : -1; 
				}
			}  )
			let changes = {
				fetchedData: updatedData
			}
			return Object.assign({}, state, changes);
		}

		case Actions.ORDER_UPDATE: {
			if(action.payload.isDragged)
			{
				let changes = {
					fetchedData: action.payload.newOrder
				}
				return Object.assign({}, state, changes);
			}
			else{
				const updatedData = state.fetchedData.slice();
				const changes = {
					fetchedData: Object.assign( [], updatedData, {
							[ action.payload.newOrder[0] ]: updatedData[ action.payload.newOrder[1] ],
							[ action.payload.newOrder[1] ]: updatedData[ action.payload.newOrder[0] ]
					})		
				}	
				return Object.assign({}, state, changes);
			}

		}

		default: return state
	}
	
}

export default mainReducer;

