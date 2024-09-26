import { createSelector } from '@reduxjs/toolkit';

export const selectTeachersState = (state) => state.teachers.teachers;
export const selectFiltersState = (state) => state.filters;
export const selectSelectedLevel = (state) => state.filters.selectedLevel;


export const selectFilteredTeachers = createSelector(
  [selectTeachersState, selectFiltersState],
  (teachers, filters) => {
    return teachers.filter(teacher => {
      const languageMatch = filters.language === '' || teacher.languages.includes(filters.language);
      const levelMatch = filters.level === '' || teacher.levels.includes(filters.level);
      const priceMatch = teacher.price_per_hour >= filters.priceRange[0] && teacher.price_per_hour <= filters.priceRange[1];
      return languageMatch && levelMatch && priceMatch;
    });
  }
);
