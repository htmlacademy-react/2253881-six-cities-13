import { AuthorizationStatus } from '../../consts';
import userSlice from './user-slice';
import { setAuthorizationStatus } from './user-slice';
import { checkAuthAction, loginAction } from './async-user-slice';

describe('user slice', () => {
  const state = {
    authorizationStatus: AuthorizationStatus.Unknown,
  };

  it('shoud return base state on type empty action', () => {
    const res = userSlice(state, { type: '' });

    expect(res).toEqual(state);
  });

  it('shoud set status auth', () => {
    const expectedState = {
      ...state,
      authorizationStatus: AuthorizationStatus.Auth,
    };

    const result = userSlice(
      state,
      setAuthorizationStatus(AuthorizationStatus.Auth)
    );

    expect(result).toEqual(expectedState);
  });

  it('checkAuthAction.fullfield shoud set status to auth', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
    };

    const result = userSlice(state, checkAuthAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('checkAuthAction.reject shoud set status to no auth', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
    };

    const result = userSlice(state, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('login.fullfield shoud set status to auth', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
    };

    const result = userSlice(state, loginAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
