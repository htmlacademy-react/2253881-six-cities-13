import { createReducer } from '@reduxjs/toolkit';
import {
  setCity,
  setFiltredOffers,
  setAllOffers,
  setSortMethod,
} from './actions';
import { Country, SortMethod } from '../consts';
import { IOffer } from '../mocks/offers-types';

interface IStateType {
  city: Country;
  filtredOffers: Array<IOffer>;
  offers: Array<IOffer>;
  sortMethod: SortMethod;
}

const initialState: IStateType = {
  city: Country.Paris,
  filtredOffers: [],
  offers: [],
  sortMethod: SortMethod.Popular,
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
    })
    .addCase(setSortMethod, (state, action) => {
      state.sortMethod = action.payload.sortMethod;

      switch (action.payload.sortMethod) {
        case SortMethod.ByRating: {
          state.filtredOffers.sort((a, b) => b.rating - a.rating);
          break;
        }
        case SortMethod.HighToLow: {
          state.filtredOffers.sort((a, b) => b.price - a.price);
          break;
        }
        case SortMethod.LowToHigh: {
          state.filtredOffers.sort((a, b) => a.price - b.price);
          break;
        }
        case SortMethod.Popular: {
          state.filtredOffers = state.offers.filter(
            (el) => el.city.name === state.city
          );
          break;
        }
        default:
          break;
      }
    });
});
