import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import systemSlice from './slices/systemSlice';

const reducers = combineReducers({
  user: userSlice,
  system: systemSlice,
});

export const store = configureStore({
  reducer: reducers,
});
