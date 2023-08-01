import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { redirectToRoute } from '../actions';
import { APIRoute, Path } from '../../consts';
import { IUserLogin, IUserResponseLogin } from '../../types/user';

export const loginAction = createAsyncThunk<
  IUserResponseLogin,
  IUserLogin,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'user/login',
  async (
    { email, password },
    { dispatch, extra: api }
  ): Promise<IUserResponseLogin> => {
    const { data } = await api.post<IUserResponseLogin>(APIRoute.Login, {
      email,
      password,
    });

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
