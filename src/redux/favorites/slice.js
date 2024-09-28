import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromLocalStorage = () => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const initialState = {
  favorites: loadFavoritesFromLocalStorage(),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, { payload }) {
      if (!state.favorites.includes(payload)) {
        state.favorites.push(payload);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFavorite(state, { payload }) {
      state.favorites = state.favorites.filter(el => el !== payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});


export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;


