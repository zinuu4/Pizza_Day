import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpModal: false,
  loginModal: false
}

const userSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setSignUpModal: (state, action) => {
      state.signUpModal = action.payload;
    },
    setLoginModal: (state, action) => {
      state.loginModal = action.payload;
    },
  },
});

const {actions, reducer} = userSlice;

export default reducer;

export const {
  setSignUpModal,
  setLoginModal
} = actions;