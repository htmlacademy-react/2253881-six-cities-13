import { createReducer } from '@reduxjs/toolkit';
import { setCity, setFiltredOffers, setAllOffers } from './actions';
import { Country } from '../consts';
import { IOffer } from '../mocks/offers-types';

interface IStateType {
  city: Country;
  filtredOffers: Array<IOffer>;
  offers: Array<IOffer>;
}

const initialState: IStateType = {
  city: Country.Paris,
  filtredOffers: [],
  offers: [],
};

export const mainReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(setFiltredOffers, (state, action) => {
      state.filtredOffers = state.offers.filter(
        (country) => country.city.name === action.payload.cityName
      );
    })
    .addCase(setAllOffers, (state, action) => {
      state.offers = [...action.payload.offers];
    });
});
