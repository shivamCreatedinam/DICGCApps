import { configureStore } from '@reduxjs/toolkit';
import HomeReducers from './reducers/surveycounter';

export const store = configureStore({
    reducer: {
        user: HomeReducers,
    },
})