import { createSlice } from '@reduxjs/toolkit';
// import type { IState } from '../store';

// Define a type for the slice state
// interface AppearanceState {
//   dark: boolean;
//   language: string
// }

// Define the initial state using that type
const initialState = {
  user: {},
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginSubmit: () => {},
  },
});

export const { loginSubmit } = authSlice.actions;

export default authSlice.reducer;
