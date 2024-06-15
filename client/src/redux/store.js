import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import blogSlice from './blogSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: "store",
    storage
}

const rootReducer = combineReducers({ auth: authSlice, blog: blogSlice })
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer
})

export const persistedStore = persistStore(store)