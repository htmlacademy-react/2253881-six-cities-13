import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { redirect } from './middlewares/redirect';
import userSlice from './user-slice/user-slice';
import offersSlice from './offers-slice/offers-slice';

const api = createApi();

export const rootReducer = combineReducers({
  offers: offersSlice,
  user: userSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }).concat(redirect),
});
