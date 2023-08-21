import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../../types/state';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeCommets,
  makeOffers,
} from '../../mocks/mocks';
import * as tokenFunc from '../../services/token';
import axios from 'axios';
import { APIRoute, BASE_BACKEND_URL } from '../../consts';
import { sendComment } from './async-comments';
import { setComments } from './comments-slice';

describe('user slice thunks', () => {
  const insAxios = createApi();
  const mockAxiosVanila = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(insAxios)];

  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      comments: {
        comments: [],
      },
    });
  });

  describe('sendComment', () => {
    it('should dispatch "sendComment.pending" and "sendComment.fulfilled" with thunk "sendComment', async () => {
      const mockComments = makeCommets();
      const mockOffers = makeOffers();
      const mokedGetToken = vi.spyOn(tokenFunc, 'getToken');

      mockAxiosVanila
        .onPost(`${BASE_BACKEND_URL + APIRoute.Comments + mockOffers[0].id}`)
        .reply(200, mockComments[0]);

      await store.dispatch(
        sendComment({
          id: mockOffers[0].id,
          form: {
            rating: 2,
            comment: 'ad',
          },
        })
      );

      expect(mokedGetToken).toBeCalledTimes(1);

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendComment.pending.type,
        setComments.type,
        sendComment.fulfilled.type,
      ]);
    });
  });
});
