import { createSlice } from '@reduxjs/toolkit';
import { userReducers } from './reducers';
import { User } from '@/types/user';

const initialState: User = {
  id: undefined,
  name: undefined,
  phone: undefined,
  email: undefined,
  password: undefined,
  genre: undefined,
  birthday: undefined,
  weight: undefined,
  height: undefined,
  goal: undefined,
  foodRestrictions: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: userReducers,
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
