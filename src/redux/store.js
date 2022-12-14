import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducers';

export const store = configureStore({
    reducer: rootReducer
})
