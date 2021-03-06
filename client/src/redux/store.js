import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middlewares = [thunk];

//only include logger for development environment 
//has three values, development/production/test
if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

export {store, persistor};