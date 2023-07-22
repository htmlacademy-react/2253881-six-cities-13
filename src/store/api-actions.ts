import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { setLoading, setAllOffers, setFiltredOffers } from './actions';
import { APIRoute, City } from '../consts';
import { IOffer } from '../types/offers';

export const fetchOffersAction = createAsyncThunk<
  void,
  City,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('offers/fetchOffers', async (city, { dispatch, extra: api }) => {
  dispatch(setLoading(true));
  const { data } = await api.get<Array<IOffer>>(APIRoute.Offers);
  dispatch(setLoading(false));
  dispatch(setAllOffers(data));
  dispatch(setFiltredOffers(city));
});
