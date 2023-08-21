import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { redirectToRoute } from '../actions';
import { APIRoute, Path, SortMethod } from '../../consts';
import {
  IUserLogin,
  IUserResponseLogin,
  IUserLoginData,
} from '../../types/user';

import {
  fetchFavOffers,
  fetchOffersAction,
} from '../offers-slice/async-offers-actions';
import { setSortMethod } from '../offers-slice/offers-slice';
import { setToken } from '../../services/token';
import { setLocalUserData } from '../../services/utils';

export const loginAction = createAsyncThunk<
  IUserResponseLogin,
  IUserLogin,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'user/login',
  async (
    { email, password },
    { dispatch, extra: api, getState }
  ): Promise<IUserResponseLogin> => {
    const { data } = await api.post<IUserResponseLogin>(APIRoute.Login, {
      email,
      password,
    });

    setToken(data.token);

    const userData: IUserLoginData = {
      name: data.name,
      isPro: data.isPro,
      email: data.email,
      avatarUrl: data.avatarUrl,
    };

    setLocalUserData(userData);

    dispatch(fetchOffersAction(getState().offers.city));
    dispatch(setSortMethod(SortMethod.Popular));
    dispatch(fetchFavOffers());
    dispatch(redirectToRoute(Path.Main));
    return data;
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/logout', async (_, { extra: api }) => {
  await api.delete(APIRoute.Logout);
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/checkAuth', async (_, { extra: api }) => {
  await api.get(APIRoute.Login);
});
