import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  password: null,
  name: null,
  surname: null,
  city: null,
  gender: null,
  token: null,
  id: null,
  chosenCity: 'Bila Tserkva',
  chosenRestaurant: '',
  order: [],
  totalOrderPrice: 0
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.city = action.payload.city;
      state.gender = action.payload.gender;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser: (state) => {
      state.email = null;
      state.password = null;
      state.name = null;
      state.surname = null;
      state.city = null;
      state.gender = null;
      state.token = null;
      state.id = null;
    },
    setChosenCity: (state, action) => {
      state.chosenCity = action.payload;
    },
    setChosenRestaurant: (state, action) => {
      state.chosenRestaurant = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setTotalOrderPrice: (state, action) => {
      state.totalOrderPrice = action.payload;
    },
    addItemToOrder: (state, action) => {
      state.order = [...state.order, action.payload];
    },
    deleteItemFromOrder: (state, action) => {
      state.order = state.order.filter(item => item.name !== action.payload);
    },
  },
});

const {actions, reducer} = userSlice;

export default reducer;

export const {
  setUser,
  removeUser,
  setChosenCity,
  setChosenRestaurant,
  addItemToOrder,
  setTotalOrderPrice,
  setOrder,
  deleteItemFromOrder
} = actions;