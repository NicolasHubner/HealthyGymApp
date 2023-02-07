import { User } from '@/types/user';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: User = {
  id: undefined,
  token: undefined,
  username: undefined,
  email: undefined,
  provider: undefined,
  confirmed: undefined,
  blocked: undefined,
  name: undefined,
  birthdate: undefined,
  gender: undefined,
  weight: undefined,
  height: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  goal_type: undefined,
  phone: undefined,
  foodRestrictions: undefined,
  passwordForRegister: undefined,
  isLogged: undefined,
};

export const userReducers = {
  setUserInfo: (state: User, action: PayloadAction<User>) => {
    const { payload } = action;
    const userInfo: User = payload;

    return {
      ...state,
      ...userInfo,
    };
  },

  clearUserInfo: () => {
    return {
      ...initialState,
    };
  },
};
