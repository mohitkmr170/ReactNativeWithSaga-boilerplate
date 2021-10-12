import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {compose, createStore, applyMiddleware} from 'redux';
import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';

const appReducer = combineReducers({});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

const blacklistPaths: Array<any> = [];

const rootPersistConfig = {
  key: DeviceInfo.getBundleId(),
  debounce: 100,
  storage: AsyncStorage,
  whitelist: [],
  blacklist: blacklistPaths,
};
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

let middleWares: Array<any> = [];
let enhancers: Array<any> = [];

const sagaMiddleware = createSagaMiddleware();

middleWares.push(sagaMiddleware);

/* Following logic enables logger in only development mode in any environment */
if (__DEV__) {
  enhancers.push(applyMiddleware(...middleWares, logger));
} else {
  enhancers.push(applyMiddleware(...middleWares));
}

const store = createStore(persistedReducer, compose(...enhancers));

export {sagaMiddleware, store};
