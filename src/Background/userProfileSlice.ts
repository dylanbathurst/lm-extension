import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export type ProfileType = {
  firstName: string
  lastName: string
  email: string
  gender: ['Male', 'Female']
  age: number
  location: string
}

const initialState: Partial<ProfileType> = {}

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileType>>) => {
      return { ...state, ...action.payload }
    },
    removeProfile: () => {
      return undefined
    },
  },
})

export const { actions, reducer } = userProfileSlice

// selectors
export const userProfile = (state: RootState) => state.userProfile
