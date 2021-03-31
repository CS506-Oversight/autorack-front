import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import alertReducer from './alert/reducer';
import authReducer from './auth/reducer';
import restockReducer from './restock/restockReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'alert'],
};

const rootReducer = combineReducers({auth: authReducer, alert: alertReducer, restock: restockReducer});

export default persistReducer(persistConfig, rootReducer);
