import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';
import { composeWithDevTools } from 'redux-devtools-extension';
import mainReducer from './reducers/reducers';

const composeEnhancers = process.env !== 'production'
  ? composeWithDevTools
  : compose;

const store = createStore(
  mainReducer, composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
    ),
  ),
);

export default store;
