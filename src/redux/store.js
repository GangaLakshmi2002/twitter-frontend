import {configureStore,combineReducers} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const rootReducer = combineReducers({
    user:userSlice,
    tweet:tweetSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Redux Toolkit’s default middleware includes a serializableCheck to ensure that actions and state are serializable (i.e., can be converted into JSON format).
//  However, some of the actions used by redux-persist (such as FLUSH, REHYDRATE, etc.) are not entirely serializable or necessary to check for this purpose.

const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;