import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import {
  setLoading,
  setAllOffers,
  setFiltredOffers,
  setAuthorizationStatus,
  redirectToRoute,
} from './actions';
import { APIRoute, City, AuthorizationStatus, Path } from '../consts';
import { IOffer } from '../types/offers';
import { IUserLogin, IUserResponseLogin } from '../types/user';
import { deleteToken, setToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<
  void,
  City,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('offers/fetchOffers', async (city, { dispatch, extra: api }) => {
  dispatch(setLoading(true));
  const { data } = await api.get<Array<IOffer>>(APIRoute.Offers);
  dispatch(setLoading(false));
  dispatch(setAllOffers(data));
  dispatch(setFiltredOffers(city));
});

export const loginAction = createAsyncThunk<
  void,
  IUserLogin,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<IUserResponseLogin>(APIRoute.Login, {
    email,
    password,
  });

  setToken(data.token);
  dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  dispatch(redirectToRoute(Path.Main));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/logout', async (_, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  deleteToken();
  dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/checkAuth', async (_, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});
