import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  subId: string | null;
}

const initialState: AuthState = {
  subId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSubId(state, action: PayloadAction<string>) {
      state.subId = action.payload;
    },
    clearSubId(state) {
      state.subId = null;
    },
  },
});

export const { setSubId, clearSubId } = authSlice.actions;
export default authSlice.reducer;