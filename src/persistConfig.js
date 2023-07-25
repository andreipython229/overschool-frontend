import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './store/redux/store';

const persistConfig = {
  key: 'root',
  storage,
};