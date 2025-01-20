import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatImage } from '../api/catApi';


interface CatState {
  images: CatImage[];
  favorites: { [key: string]: boolean }; 
}

const initialState: CatState = {
  images: [],
  favorites: {},
};

const catSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<CatImage[]>) => {
      state.images = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const breedId = action.payload;
      state.favorites[breedId] = !state.favorites[breedId];
      console.log('Updated favorites:', state.favorites); // Проверка
    }
  },
});

export const { setImages, toggleFavorite } = catSlice.actions;
export default catSlice.reducer;
