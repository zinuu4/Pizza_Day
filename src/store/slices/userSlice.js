import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  name: '',
  surname: '',
  gender: '',
  birthday: '',
  token: null,
  id: null,
  chosenCity: '',
  chosenRestaurant: '',
  favouriteProducts: [],
  order: [],
  totalOrderPrice: 0
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuthData: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    setBasicUserData: (state, action) => {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.birthday = action.payload.birthday;
      state.gender = action.payload.gender;
    },
    removeUser: (state) => {
      state.email = null;
      state.password = null;
      state.birthday = null;
      state.name = null;
      state.surname = null;
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
      state.order = [...state.order, ...action.payload];
    },
    deleteItemFromOrder: (state, action) => {
      state.order = state.order.filter(item => item.name !== action.payload);
    },
    setFavouriteProducts: (state, action) => {
      state.favouriteProducts = action.payload;
    },
  },
});

const {actions, reducer} = userSlice;

export default reducer;

export const {
  setUserAuthData,
  setBasicUserData,
  removeUser,
  setChosenCity,
  setChosenRestaurant,
  addItemToOrder,
  setTotalOrderPrice,
  setOrder,
  deleteItemFromOrder,
  setFavouriteProducts
} = actions;