import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restarauntModalOpen: false
}

const userSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setRestarauntModal: (state, action) => {
      state.restarauntModalOpen = action.payload;
    },
  },
});

const {actions, reducer} = userSlice;

export default reducer;

export const {
  setRestarauntModal
} = actions;