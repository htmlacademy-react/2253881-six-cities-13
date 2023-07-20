import { createAction } from '@reduxjs/toolkit';
import { City } from '../consts';
import { IOffer } from '../mocks/offers-types';
import { SortMethod } from '../consts';

export const setCity = createAction<{ city: City }>('city/changeCity');

export const setFiltredOffers = createAction<{
  cityName: string;
}>('offers/setFiltredOffers');

export const setAllOffers = createAction<{
  offers: Array<IOffer>;
}>('offers/setAllOffers');

export const setSortMethod = createAction<{
  sortMethod: SortMethod;
}>('offers/setSortMethod');
