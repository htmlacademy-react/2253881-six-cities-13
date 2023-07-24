import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { mainReducer } from './reducer';

const api = createApi();

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});
