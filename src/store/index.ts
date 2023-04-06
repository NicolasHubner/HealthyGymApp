import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
