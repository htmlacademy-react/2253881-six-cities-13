import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { checkAuthAction, logoutAction, loginAction } from './async-user-slice';
import { deleteToken, setToken } from '../../services/token';
import { AuthorizationStatus } from '../../consts';

interface IuserSlice {
  authorizationStatus: AuthorizationStatus;
}

const initialState: IuserSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userSlice = createSlice({
  name: '@user',
  initialState,
  reducers: {
    setAuthorizationStatus: (
      state,
      action: PayloadAction<AuthorizationStatus>
    ) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        deleteToken();
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.rejected, () => {
        toast.warn('Ошибка разлогирования');
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        setToken(action.payload.token);
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, () => {
        toast.warn('Ошибка логирования');
      });
  },
});

export default userSlice.reducer;

export const { setAuthorizationStatus } = userSlice.actions;
