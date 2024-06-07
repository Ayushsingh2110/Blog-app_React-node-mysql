import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import blogSlice from './blogSlice'

const rootReducer = combineReducers({ auth: authSlice, blog: blogSlice })

export const store = configureStore({
    reducer: rootReducer
})