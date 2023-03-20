import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ProfileType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: ['Male', 'Female'];
  age?: number;
  location?: string;
};

const initialState: ProfileType = {};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<ProfileType>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { actions, reducer } = userProfileSlice;
