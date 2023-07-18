import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from './actions';
import { Country } from '../consts';
import { IOffer } from '../mocks/offers-types';

interface IStateType {
  city: Country;
  offers: Array<IOffer>;
}

const initialState: IStateType = {
  city: Country.Paris,
  offers: [],
};

export const mainReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = [...action.payload.offers];
    });
});
