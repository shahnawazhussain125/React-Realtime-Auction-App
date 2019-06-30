import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { loadState, setState } from './localStorage';

const persistedState = loadState();

const store = createStore(rootReducer,persistedState, applyMiddleware(thunk, logger));

store.subscribe(()=>{
    setState(store.getState());
});

export default store;