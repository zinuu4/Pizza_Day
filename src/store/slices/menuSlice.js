import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzaFor155UahTop: '',
  pizzaFor129UahTop: '',
  pizzaFor115UahTop: '',
  pizzaFor99UahTop: '',
  saucesTop: '',
  drinksTop: '',
}

const userSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setProductsTop: (state, action) => {
      state.pizzaFor155UahTop = action.payload.pizzaFor155UahTop;
      state.pizzaFor129UahTop = action.payload.pizzaFor129UahTop;
      state.pizzaFor115UahTop = action.payload.pizzaFor115UahTop;
      state.pizzaFor99UahTop = action.payload.pizzaFor99UahTop;
      state.saucesTop = action.payload.saucesTop;
      state.drinksTop = action.payload.drinksTop;
    }
  },
});

const {actions, reducer} = userSlice;

export default reducer;

export const {
  setProductsTop
} = actions;