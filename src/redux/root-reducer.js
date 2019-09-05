import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //local storage as default storage

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['cart'] //add reducers we want to store/persist
}

const rootReducer = combineReducers({
    user:userReducer,
    cart:cartReducer
});

export default persistReducer(persistConfig, rootReducer);