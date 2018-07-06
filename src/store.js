import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';
import { composeWithDevTools } from 'redux-devtools-extension';
import mainReducer from './reducers/reducers';
import { loadState, saveState } from './sessionStorage';

const composeEnhancers = process.env !== 'production'
  ? composeWithDevTools
  : compose;

const loadedState = loadState();

const store = createStore(
  mainReducer, loadedState, composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
    ),
  ),
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}), 1000);

export default store;
