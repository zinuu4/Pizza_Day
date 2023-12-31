import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  id: null,
  name: "",
  surname: "",
  gender: "",
  birthday: "",
  city: "",
  avatar:
    "https://firebasestorage.googleapis.com/v0/b/auth-pizza-day.appspot.com/o/users%2FbasicUserAvatar.jpeg?alt=media&token=f42c8e42-4a8b-4fec-962a-854cfd1bfdca",
  chosenCity: "Bila Tserkva",
  chosenRestaurant: {
    name: "",
    id: "",
    address: "",
    timeOpen: "",
    lat: 1,
    lng: 1,
  },
  favouriteProducts: [],
  historyOfOrders: [],
  order: [],
  mergedOrder: [],
  totalOrderPrice: 0,
  doneOrderInfo: { time: "", id: "", date: "", orderPrice: "" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAuthData: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    setBasicUserData: (state, action) => {
      const { name, surname, birthday, gender, city, avatar } = action.payload;

      if (name) {
        state.name = name;
      }

      if (surname) {
        state.surname = surname;
      }

      if (birthday) {
        state.birthday = birthday;
      }

      if (gender) {
        state.gender = gender;
      }

      if (city) {
        state.city = city;
      }

      if (avatar) {
        state.avatar = avatar;
      }
    },

    removeUser: (state) => {
      state.email = null;
      state.birthday = null;
      state.avatar =
        "https://firebasestorage.googleapis.com/v0/b/auth-pizza-day.appspot.com/o/users%2FbasicUserAvatar.jpeg?alt=media&token=f42c8e42-4a8b-4fec-962a-854cfd1bfdca";
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
    setMergedOrder: (state, action) => {
      state.mergedOrder = action.payload;
    },
    setTotalOrderPrice: (state, action) => {
      state.totalOrderPrice = action.payload;
    },
    addItemToOrder: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.order = [...state.order, ...action.payload];
      } else {
        state.order = [action.payload, ...state.order];
      }
    },
    deleteItemFromOrder: (state, action) => {
      state.order = state.order.filter((item) => item.uuid !== action.payload);
    },
    deleteItemsFromOrder: (state, action) => {
      state.order = state.order.filter((item) => item.name !== action.payload);
    },
    setFavouriteProducts: (state, action) => {
      state.favouriteProducts = action.payload;
    },
    setOrderNumber: (state, action) => {
      state.orderNumber = action.payload;
    },
    setHistoryOfOrders: (state, action) => {
      state.historyOfOrders = action.payload;
    },
    setDoneOrderInfo: (state, action) => {
      state.doneOrderInfo = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

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
  setFavouriteProducts,
  setMergedOrder,
  deleteItemsFromOrder,
  setHistoryOfOrders,
  setDoneOrderInfo,
} = actions;
