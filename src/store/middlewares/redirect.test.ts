import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import browserHistory from '../../browser-history';
import { State } from '../../types/state';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../actions';
import { Path } from '../../consts';

vitest.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Redirect test', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator({});
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should reditect to login with redirectAction action', () => {
    store.dispatch(redirectToRoute(Path.Login));
    expect(browserHistory.location.pathname).toBe(Path.Login);
  });

  it('should not redirect to main with emoty action', () => {
    const action = { type: '', payload: Path.Main };

    store.dispatch(action);
    expect(browserHistory.location.pathname).not.toBe(Path.Main);
  });
});
