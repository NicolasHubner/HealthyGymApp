import { User } from '@/types/user';
import { PayloadAction } from '@reduxjs/toolkit';

export const userReducers = {
  setUserInfo: (state: User, action: PayloadAction<User>) => {
    const newUserInfo = action.payload;
    // console.log('newUserInfo', newUserInfo);
    state = {
      ...state,
      ...newUserInfo,
    };
    return state;
  },

  clearUserInfo: (state: User) => {
    state.id = undefined;
    state.name = undefined;
    state.phone = undefined;
    state.email = undefined;
    state.password = undefined;
    state.genre = undefined;
    state.birthday = undefined;
    state.weight = undefined;
    state.height = undefined;
    state.goal = undefined;
    state.foodRestrictions = [];
  },
};
