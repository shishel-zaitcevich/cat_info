
import { configureStore } from '@reduxjs/toolkit';
import catReducer from '../store/catSlice';
import { catApi } from '../api/catApi';


export const store = configureStore({
  reducer: {
    cats: catReducer,
    [catApi.reducerPath]: catApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
