import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import reviewReducer from './slices/reviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    review: reviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;