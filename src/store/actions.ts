import { createAction } from '@reduxjs/toolkit';
import { City } from '../consts';
import { IOffer } from '../mocks/offers-types';
import { SortMethod } from '../consts';

export const setCity = createAction<City>('city/changeCity');

export const setFiltredOffers = createAction<City>('offers/setFiltredOffers');

export const setAllOffers = createAction<Array<IOffer>>('offers/setAllOffers');

export const setSortMethod = createAction<SortMethod>('offers/setSortMethod');
