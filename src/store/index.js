import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import session from 'redux-persist/lib/storage/session'

import reducers from './ducks'

const keepConnected = localStorage.getItem('keepConnected');

const persistConfigLocal = {
    key: 'user',
    storage,
}

const persistConfigSession = {
    key: 'user',
    storage: session,
}

var persistConfig = persistConfigLocal;

if (keepConnected === 'true') {
    persistConfig = persistConfigLocal
} else {
    persistConfig = persistConfigSession
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }