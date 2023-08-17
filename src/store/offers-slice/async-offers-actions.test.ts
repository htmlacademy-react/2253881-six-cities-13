import { createApi } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../../types/state';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeOffers,
} from '../../mocks/mocks';
import {
  APIRoute,
  AuthorizationStatus,
  BASE_BACKEND_URL,
  City,
  SortMethod,
} from '../../consts';
import {
  changeFavouriteStatusOffer,
  fetchFavOffers,
  fetchOffersAction,
} from './async-offers-actions';
import { setAllOffers, setFiltredOffers } from './offers-slice';
import * as tokenFunc from '../../services/token';
import axios from 'axios';
import { redirectToRoute } from '../actions';

describe('offers thunk thunks', () => {
  const insAxios = createApi();
  const mockAxiosInst = new MockAdapter(insAxios);
  const mockVanilaAxios = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(insAxios)];

  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      offers: {
        city: City.Paris,
        filtredOffers: [],
        offers: [],
        sortMethod: SortMethod.Popular,
        loadingStatus: false,
        nearbyOffers: [],
        favOffers: [],
        currentOffer: null,
      },
    });
  });

  describe('offers async actions', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" with thunk "fetchOffersAction', async () => {
      const mockOffers = makeOffers();

      mockAxiosInst.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction(City.Paris));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        setAllOffers.type,
        setFiltredOffers.type,
        fetchOffersAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchFavOffers.pending" and "fetchFavOffers.fulfilled" with thunk "fetchFavOffers', async () => {
      const mockOffers = makeOffers();
      const mokedGetToken = vi.spyOn(tokenFunc, 'getToken');

      mockVanilaAxios
        .onGet(`${BASE_BACKEND_URL}${APIRoute.Favorite}`)
        .reply(200, mockOffers);

      await store.dispatch(fetchFavOffers());

      expect(mokedGetToken).toBeCalledTimes(1);

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavOffers.pending.type,
        fetchFavOffers.fulfilled.type,
      ]);
    });

    it('should dispatch "changeFavouriteStatusOffer.pending" and "changeFavouriteStatusOffer.fulfilled" with thunk "changeFavouriteStatusOffer', async () => {
      const mockOffers = makeOffers();
      const mokedGetToken = vi.spyOn(tokenFunc, 'getToken');

      mockVanilaAxios
        .onPost(
          `${BASE_BACKEND_URL}${APIRoute.Favorite}/${mockOffers[0].id}/${
            mockOffers[0].isFavorite ? 0 : 1
          }`
        )
        .reply(200, {
          ...mockOffers[0],
          isFavorite: !mockOffers[0].isFavorite,
        });

      await store.dispatch(
        changeFavouriteStatusOffer({
          idOffer: mockOffers[0].id,
          isFavorite: mockOffers[0].isFavorite,
        })
      );

      expect(mokedGetToken).toBeCalledTimes(2);

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavouriteStatusOffer.pending.type,
        fetchFavOffers.pending.type,
        changeFavouriteStatusOffer.fulfilled.type,
      ]);
    });

    it('change fav status on error shpuld redirect', async () => {
      const mockOffers = makeOffers();
      const mokedGetToken = vi.spyOn(tokenFunc, 'getToken');

      mockVanilaAxios
        .onPost(
          `${BASE_BACKEND_URL}${APIRoute.Favorite}/${mockOffers[0].id}/${
            mockOffers[0].isFavorite ? 0 : 1
          }`
        )
        .reply(404);

      await store.dispatch(
        changeFavouriteStatusOffer({
          idOffer: mockOffers[0].id,
          isFavorite: mockOffers[0].isFavorite,
        })
      );

      expect(mokedGetToken).toBeCalledTimes(1);

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavouriteStatusOffer.pending.type,
        redirectToRoute.type,
        changeFavouriteStatusOffer.rejected.type,
      ]);
    });
  });
});
