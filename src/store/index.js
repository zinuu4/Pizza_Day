import { configureStore } from '@reduxjs/toolkit';
import user from './slices/userSlice';
import modals from './slices/modalsSlice';
import db from './slices/dataBaseSlice';
import firebaseConfig from './slices/fireBaseConfigSlice';

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    })
  }
  return next(action);
};

const store = configureStore({
  reducer: {user, modals, db, firebaseConfig},
  middleware: GetDefaultMiddleware => GetDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;