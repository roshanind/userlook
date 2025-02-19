import { createSlice } from '@reduxjs/toolkit';

import { THEME } from '@constants/app.constants';
import { AppState } from '@type/app.types';

const initialState: AppState = {
  theme: THEME.LIGHT,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === THEME.LIGHT ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = appSlice.actions;

export const selectTheme = (state: { app: AppState }) => state.app.theme;

export default appSlice.reducer;
