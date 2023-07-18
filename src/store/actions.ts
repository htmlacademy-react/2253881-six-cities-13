import { createAction } from '@reduxjs/toolkit';
import { Country } from '../consts';
import { IOffer } from '../mocks/offers-types';

export const setCity = createAction<{ city: Country }>('city/changeCity');
export const setOffers = createAction<{ offers: Array<IOffer> }>(
  'offers/setOffers'
);
