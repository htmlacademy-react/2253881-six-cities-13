import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkAuthAction } from './async-user-slice';
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
      });
  },
});

export default userSlice.reducer;

export const { setAuthorizationStatus } = userSlice.actions;
