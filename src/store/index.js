import { createStore , applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';

export default createStore(reducer,applyMiddleware(thunk,createLogger()));