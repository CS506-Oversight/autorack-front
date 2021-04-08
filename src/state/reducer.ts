import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import alertReducer from './alert/reducer';
import authReducer from './auth/reducer';
// eslint-disable-next-line camelcase
import menu_reducer from './menu/menu_reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'alert'],
};

const rootReducer = combineReducers(
  {
    auth: authReducer,
    alert: alertReducer,
    menu: menu_reducer,
  },
);

export default persistReducer(persistConfig, rootReducer);
