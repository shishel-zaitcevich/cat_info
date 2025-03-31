import { configureStore } from '@reduxjs/toolkit';

import scrollReducer from './scrollSlice';
import { catApi } from '../catApi';

export const store = configureStore({
  reducer: {
    scroll: scrollReducer,
    [catApi.reducerPath]: catApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;