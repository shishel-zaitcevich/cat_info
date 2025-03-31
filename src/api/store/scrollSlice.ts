import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScrollState {
  activeIndex: number;
  direction: 1 | -1;
}

const initialState: ScrollState = {
  activeIndex: 0, 
  direction: 1, 
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
    setDirection: (state, action: PayloadAction<1 | -1>) => {
      state.direction = action.payload;
    },
  },
});

export const { setActiveIndex, setDirection } = scrollSlice.actions;
export default scrollSlice.reducer;