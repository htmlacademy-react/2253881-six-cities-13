import { createApi } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import {
  AppThunkDispatch,
  createOneCurrentOffer,
  extractActionsTypes,
  makeCommets,
  makeOffers,
} from '../../mocks/mocks';
import axios from 'axios';
import { State } from '../../types/state';
import { APIRoute, BASE_BACKEND_URL, City, SortMethod } from '../../consts';
import * as tokenFunc from '../../services/token';
import { setOffersCurrentOfferCommentsThunk } from './set-offers-comments-async';
import { setComments } from '../comments-slice/comments-slice';
import { setCurrentOffer, setNearbyOffers } from '../offers-slice/offers-slice';
import { redirectToRoute } from '../actions';

describe('common thunk ', () => {
  const insAxios = createApi();
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
      comments: {
        comments: [],
      },
    });
  });

  it('setOffersCurrentOfferCommentsThunk fullfld and pending statuses', async () => {
    const mockOffers = makeOffers();
    const mockComments = makeCommets();
    const mockCurrentOffer = createOneCurrentOffer();

    const mokedGetToken = vi.spyOn(tokenFunc, 'getToken');

    mockVanilaAxios
      .onGet(`${BASE_BACKEND_URL + APIRoute.Comments}${mockOffers[0].id}`)
      .reply(200, mockComments);

    mockVanilaAxios
      .onGet(`${BASE_BACKEND_URL + APIRoute.Offers}/${mockOffers[0].id}/nearby`)
      .reply(200, mockComments);

    mockVanilaAxios
      .onGet(`${BASE_BACKEND_URL + APIRoute.Offers}/${mockOffers[0].id}`)
      .reply(200, mockCurrentOffer);

    await store.dispatch(setOffersCurrentOfferCommentsThunk(mockOffers[0].id));

    expect(mokedGetToken).toBeCalledTimes(1);

    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      setOffersCurrentOfferCommentsThunk.pending.type,
      setComments.type,
      setNearbyOffers.type,
      setCurrentOffer.type,
      setOffersCurrentOfferCommentsThunk.fulfilled.type,
    ]);
  });

  it('setOffersCurrentOfferCommentsThunk reject redirect', async () => {
    const mockOffers = makeOffers();

    const mokedGetToken = vi.spyOn(tokenFunc, 'getToken');

    mockVanilaAxios
      .onGet(`${BASE_BACKEND_URL + APIRoute.Comments}${mockOffers[0].id}`)
      .reply(404);

    mockVanilaAxios
      .onGet(`${BASE_BACKEND_URL + APIRoute.Offers}/${mockOffers[0].id}/nearby`)
      .reply(404);

    mockVanilaAxios
      .onGet(`${BASE_BACKEND_URL + APIRoute.Offers}/${mockOffers[0].id}`)
      .reply(404);

    await store.dispatch(setOffersCurrentOfferCommentsThunk(mockOffers[0].id));

    expect(mokedGetToken).toBeCalledTimes(1);

    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      setOffersCurrentOfferCommentsThunk.pending.type,
      redirectToRoute.type,
      setOffersCurrentOfferCommentsThunk.fulfilled.type,
    ]);
  });
});
