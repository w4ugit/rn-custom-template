import {createSlice} from '@reduxjs/toolkit';

const systemSlice = createSlice({
  name: 'system',
  initialState: {
    tab: 'Search',
    showTab: true,
  },
  reducers: {
    toggleTab(state, action) {
      state.showTab = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const {skipInit, toggleTab, setCurrentTab} = systemSlice.actions;

export default systemSlice.reducer;
