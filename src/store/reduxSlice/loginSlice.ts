import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {initialState} from '../reduxState';

export const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginDetails: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
      return state;
    },
  },
});

export const {loginDetails} = login.actions;

export default login;
