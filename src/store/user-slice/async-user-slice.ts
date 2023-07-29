import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { setAuthorizationStatus } from './user-slice';
import { redirectToRoute } from '../actions';
import { APIRoute, AuthorizationStatus, Path } from '../../consts';
import { IUserLogin, IUserResponseLogin } from '../../types/user';
import { deleteToken, setToken } from '../../services/token';

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
>('user/checkAuth', async (_, { extra: api }) => {
  await api.get(APIRoute.Login);
});
