import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import userReducer from './userReducer';
import eventsReducer from './eventsReducer';

const rootReducer = combineReducers({
   user: userReducer,
   events: eventsReducer
});

export default createStore(rootReducer, compose(applyMiddleware(promise)));