import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./slices/userSlice";
import modals from "./slices/modalsSlice";
import db from "./slices/dataBaseSlice";
import profile from "./slices/profileSlice";
import menu from "./slices/menuSlice";

const rootReducer = combineReducers({
  user,
  modals,
  db,
  profile,
  menu,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
