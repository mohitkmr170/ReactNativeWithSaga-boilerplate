import {persistStore} from 'redux-persist';
import rootSaga from '@/Sagas';
import {sagaMiddleware, store} from './storeConfig';

export {store};

export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
