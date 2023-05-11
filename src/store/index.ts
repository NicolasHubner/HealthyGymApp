import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import fineshapeReducer from './fineshape';

export const store = configureStore({
    reducer: {
        user: userReducer,
        fineshape: fineshapeReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
