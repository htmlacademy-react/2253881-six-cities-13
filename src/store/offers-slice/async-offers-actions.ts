import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { redirectToRoute } from '../actions';
import { AppDispatch, State } from '../../types/state';
import { setAllOffers, setFiltredOffers } from './offers-slice';
import { IOffer } from '../../types/offers';
import { getToken } from '../../services/token';
import { APIRoute, City, BASE_BACKEND_URL, Path } from '../../consts';

export const fetchOffersAction = createAsyncThunk<
  void,
  City,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('offers/fetchOffers', async (city, { dispatch, extra: api }) => {
  const { data } = await api.get<Array<IOffer>>(APIRoute.Offers);
  dispatch(setAllOffers(data));
  dispatch(setFiltredOffers(city));
});

export const changeFavouriteStatusOffer = createAsyncThunk<
  IOffer,
  { idOffer: string; isFavorite: boolean },
  { dispatch: AppDispatch; state: State }
>(
  'offers/changeStatusIsFavourite',
  async ({ idOffer, isFavorite }, { dispatch }): Promise<IOffer> => {
    const token = getToken();

    try {
      const res = await axios.post<IOffer>(
        `${BASE_BACKEND_URL}${APIRoute.Favorite}/${idOffer}/${
          isFavorite ? 0 : 1
        }`,
        {},
        { headers: { 'x-token': token } }
      );

      const { data } = res;

      return data;
    } catch {
      dispatch(redirectToRoute(Path.Login));
      throw 'Необходима авторизация';
    }
  }
);
