import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpModal: false,
  loginModal: false,
  deliveryModal: false,
  notificationsModal: false,
  bannerInfoModal: false,
  reviewModal: false
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
    setDeliveryModal: (state, action) => {
      state.deliveryModal = action.payload;
    },
    setNotificationsModal: (state, action) => {
      state.notificationsModal = action.payload;
    },
    setBannerInfoModal: (state, action) => {
      state.bannerInfoModal = action.payload;
    },
    setReviewModal: (state, action) => {
      state.reviewModal = action.payload;
    },
  },
});

const {actions, reducer} = userSlice;

export default reducer;

export const {
  setSignUpModal,
  setLoginModal,
  setDeliveryModal,
  setNotificationsModal,
  setBannerInfoModal,
  setReviewModal
} = actions;