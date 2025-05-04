import { configureStore } from '@reduxjs/toolkit';

import scrollReducer from './scrollSlice';
import modalReducer from './modalSlice';
import authReducer from './authSlice';
import { catApi } from '../catApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    scroll: scrollReducer,
    modal: modalReducer,
    auth: authReducer, 
    [catApi.reducerPath]: catApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;