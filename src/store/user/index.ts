import { createSlice } from '@reduxjs/toolkit';
import { initialState, userReducers } from './reducers';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: userReducers,
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
