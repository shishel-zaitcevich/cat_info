import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  subId: string | null;
}

const STORAGE_KEY = 'subId';

const loadSubIdFromStorage = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  subId: loadSubIdFromStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSubId(state, action: PayloadAction<string>) {
      state.subId = action.payload;
      // Синхронизируем с localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, action.payload);
        } catch (error) {
          console.error('Failed to save subId to localStorage:', error);
        }
      }
    },
    clearSubId(state) {
      state.subId = null;
      // Очищаем localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(STORAGE_KEY);
          // Очищаем все связанные данные (например, favorites)
          Object.keys(localStorage)
            .filter((key) => key.startsWith('favorites_'))
            .forEach((key) => localStorage.removeItem(key));
        } catch (error) {
          console.error('Failed to clear localStorage:', error);
        }
      }
    },
  },
});

export const { setSubId, clearSubId } = authSlice.actions;
export default authSlice.reducer;
