
import { configureStore } from '@reduxjs/toolkit';
import catReducer from '../store/catSlice';
import { catApi } from '../api/catApi';


export const store = configureStore({
  reducer: {
    cats: catReducer,
    [catApi.reducerPath]: catApi.reducer, // Добавляем редюсер RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catApi.middleware), // Подключаем middleware RTK Query
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
