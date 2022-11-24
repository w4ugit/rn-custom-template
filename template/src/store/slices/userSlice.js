import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    accessToken: null,
    refreshToken: null,
    user: null,
  },
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.token;
      state.refreshToken = action.payload.refresh_token;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const {setTokens, setUser, logout} = userSlice.actions;

export default userSlice.reducer;
