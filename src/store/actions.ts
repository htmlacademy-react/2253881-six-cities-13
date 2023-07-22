import { createAction } from '@reduxjs/toolkit';
import { City } from '../consts';
import { IOffer } from '../types/offers';
import { SortMethod } from '../consts';

export const setCity = createAction<City>('city/changeCity');

export const setFiltredOffers = createAction<City>('offers/setFiltredOffers');

export const setAllOffers = createAction<Array<IOffer>>('offers/setAllOffers');

export const setSortMethod = createAction<SortMethod>('offers/setSortMethod');

export const setLoading = createAction<boolean>('loading/setLoading');
