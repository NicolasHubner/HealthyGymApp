import { createSlice } from '@reduxjs/toolkit';
import { userReducers } from './reducers';
import { User } from '@/types/user';

const initialState: User = {
  id: undefined,
  name: undefined,
  phone: undefined,
  email: undefined,
  genre: undefined,
  birthDate: undefined,
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

export default userSlice.reducer;
