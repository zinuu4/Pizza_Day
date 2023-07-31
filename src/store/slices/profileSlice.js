import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  choosenMenuItem: "Profile",
};

const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setChoosenMenuItem: (state, action) => {
      state.choosenMenuItem = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export default reducer;

export const { setChoosenMenuItem } = actions;
