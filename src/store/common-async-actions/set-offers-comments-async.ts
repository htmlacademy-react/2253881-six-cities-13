import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { BASE_BACKEND_URL, APIRoute, Path } from '../../consts';
import { IOffer } from '../../types/offers';
import { IComment } from '../../types/comments';
import { TOneCurrentOffer } from '../../types/offers';
import { getToken } from '../../services/token';
import { getRandomElemsFromArr } from '../../services/utils';
import { setComments } from '../comments-slice/comments-slice';
import { setCurrentOffer, setNearbyOffers } from '../offers-slice/offers-slice';
import { redirectToRoute } from '../actions';

export const setOffersCurrentOfferCommentsThunk = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'common/setOffersCurrentOfferComments',
  async (id, { dispatch, getState }) => {
    const offers = getState().offers.offers;
    const token = getToken();

    const urls = [
      `${BASE_BACKEND_URL + APIRoute.Comments}${id || ''}`,
      `${BASE_BACKEND_URL + APIRoute.Offers}/${id || ''}/nearby`,
      `${BASE_BACKEND_URL + APIRoute.Offers}/${id || ''}`,
    ];

    const requests = urls.map((url) =>
      axios.get(url, { headers: { 'x-token': token } })
    );
    try {
      const responses = await axios.all(requests);

      const currentOfferForNerbyMap = offers.find((el) => el.id === id);

      const nearByOffersSliced = getRandomElemsFromArr(
        responses[1].data as Array<IOffer>,
        3
      );
      const nearbyOffersToSave = [
        ...nearByOffersSliced,
        currentOfferForNerbyMap,
      ];
      dispatch(setComments(responses[0].data as Array<IComment>));
      dispatch(setNearbyOffers(nearbyOffersToSave as Array<IOffer>));
      dispatch(setCurrentOffer(responses[2].data as TOneCurrentOffer));
    } catch {
      dispatch(redirectToRoute(Path.NotFound));
    }
  }
);
