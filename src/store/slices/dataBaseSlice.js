import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sauces: [],
  drinks: [],
  pizzaFor155Uah: [],
  pizzaFor129Uah: [],
  pizzaFor115Uah: [],
  pizzaFor99Uah: []
}

const userSlice = createSlice({
  name: 'db',
  initialState,
  reducers: {
    setSauces: (state, action) => {
      state.sauces = action.payload;
    },
    setDrinks: (state, action) => {
      state.drinks = action.payload;
    },
    setPizzaFor155Uah: (state, action) => {
      state.pizzaFor155Uah = action.payload;
    },
    setPizzaFor129Uah: (state, action) => {
      state.pizzaFor129Uah = action.payload;
    },
    setPizzaFor115Uah: (state, action) => {
      state.pizzaFor115Uah = action.payload;
    },
    setPizzaFor99Uah: (state, action) => {
      state.pizzaFor99Uah = action.payload;
    }
  },
});

const {actions, reducer} = userSlice;

export default reducer;

export const {
  setSauces,
  setDrinks,
  setPizzaFor155Uah,
  setPizzaFor129Uah,
  setPizzaFor115Uah,
  setPizzaFor99Uah
} = actions;