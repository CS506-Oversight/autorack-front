import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import alertReducer from './alert/reducer';
import authReducer from './auth/reducer';
import ingredientReducer from './ingredient/reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'alert', 'ingredient'],
};

const rootReducer = combineReducers(
  {
    auth: authReducer,
    alert: alertReducer,
    ingredient: ingredientReducer,
  },
);

export default persistReducer(persistConfig, rootReducer);
