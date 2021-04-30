import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import alertReducer from './alert/reducer';
import authReducer from './auth/reducer';
import ingredientReducer from './ingredient/reducer';
import inventoryReducer from './inventory/reducer';
import menuReducer from './menu/reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'alert', 'ingredient', 'menu'],
};

const rootReducer = combineReducers(
  {
    auth: authReducer,
    alert: alertReducer,
    ingredient: ingredientReducer,
    menu: menuReducer,
    inventory: inventoryReducer,
  },
);

export default persistReducer(persistConfig, rootReducer);
