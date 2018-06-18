import { createStore, applyMiddleware  } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import mainReducer from './reducers.js';
import { saveState, loadState} from './localstorage.js';

const loggerMiddleware = createLogger();

const store = createStore(
	mainReducer,
	applyMiddleware(
    thunkMiddleware, 
    loggerMiddleware 
	));

store.subscribe(() => {
	saveState({
	})
});

export default store;