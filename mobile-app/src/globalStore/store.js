// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './slices/countrySlice';
import languageReducer from './slices/languageSlice';

const store = configureStore({
  reducer: {
    language: languageReducer,
    country: countryReducer,
  },
});

export default store;
