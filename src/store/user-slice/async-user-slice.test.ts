import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../../types/state';
import { AppThunkDispatch, extractActionsTypes } from '../../mocks/mocks';
import { APIRoute, AuthorizationStatus, City } from '../../consts';
import { checkAuthAction, loginAction, logoutAction } from './async-user-slice';
import { redirectToRoute } from '../actions';
import {
  fetchOffersAction,
  fetchFavOffers,
} from '../offers-slice/async-offers-actions';
import { setSortMethod } from '../offers-slice/offers-slice';
import { IUserLogin, IUserResponseLogin } from '../../types/user';
import * as tokenFunc from '../../services/token';
import * as setData from '../../services/utils';

describe('user slice thunks', () => {
  const insAxios = createApi();
  const mockAxiosInst = new MockAdapter(insAxios);
  const middleware = [thunk.withExtraArgument(insAxios)];

  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      user: { authorizationStatus: AuthorizationStatus.Unknown },
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosInst.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });
  });

  describe('logoutAuthAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" with thunk "logoutAction', async () => {
      mockAxiosInst.onDelete(APIRoute.Logout).reply(200);

      await store.dispatch(logoutAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending" and "loginAction.fulfilled" with thunk "loginAction', async () => {
      store = mockStoreCreator({
        user: { authorizationStatus: AuthorizationStatus.Unknown },
        offers: { city: City.Paris },
      });

      const user: IUserLogin = {
        email: 'asdasd@asdas.asd',
        password: 'aasdasd2',
      };
      const fakeAnsServer: IUserResponseLogin = {
        name: 'asdasd',
        avatarUrl: 'asdasd',
        isPro: true,
        email: 'asdasd@asdas.asd',
        token: 'sdsad',
      };

      mockAxiosInst.onPost(APIRoute.Login).reply(200, fakeAnsServer);

      await store.dispatch(loginAction(user));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        fetchOffersAction.pending.type,
        setSortMethod.type,
        fetchFavOffers.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call save token and save data', async () => {
      store = mockStoreCreator({
        user: { authorizationStatus: AuthorizationStatus.Unknown },
        offers: { city: City.Paris },
      });

      const user: IUserLogin = {
        email: 'asdasd@asdas.asd',
        password: 'aasdasd2',
      };
      const fakeAnsServer: IUserResponseLogin = {
        name: 'asdasd',
        avatarUrl: 'asdasd',
        isPro: true,
        email: 'asdasd@asdas.asd',
        token: 'sdsad',
      };

      mockAxiosInst.onPost(APIRoute.Login).reply(200, fakeAnsServer);

      const mockSaveToken = vi.spyOn(tokenFunc, 'setToken');
      const mockSaveData = vi.spyOn(setData, 'setLocalUserData');

      await store.dispatch(loginAction(user));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveData).toBeCalledTimes(1);

      expect(mockSaveToken).toBeCalledWith(fakeAnsServer.token);

      const dataToSave = {
        name: 'asdasd',
        avatarUrl: 'asdasd',
        isPro: true,
        email: 'asdasd@asdas.asd',
      };

      expect(mockSaveData).toBeCalledWith(dataToSave);
    });
  });
});
