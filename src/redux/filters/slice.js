import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    language: '',
    level: '',
    priceRange: [0, 100], 
  },
 reducers: {
    setLanguageFilter(state, action) {
      state.language = action.payload;
    },
    setLevelFilter(state, action) {
      state.level = action.payload;
    },
    setPriceFilter(state, action) {
      state.priceRange = action.payload;
    },
    clearFilters(state) {
      state.language = '';
      state.level = '';
      state.priceRange = [0, 100];
    },
  },
});

export const { setLanguageFilter, setLevelFilter, setPriceFilter, clearFilters } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
