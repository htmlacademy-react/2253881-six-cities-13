import { AuthorizationStatus } from '../../consts';
import userSlice from './user-slice';
import { setAuthorizationStatus } from './user-slice';

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
});
