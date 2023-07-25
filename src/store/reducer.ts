import { createReducer } from '@reduxjs/toolkit';
import {
  setCity,
  setFiltredOffers,
  setAllOffers,
  setSortMethod,
  setLoading,
  setAuthorizationStatus,
} from './actions';
import { AuthorizationStatus, City, SortMethod } from '../consts';
import { IOffer } from '../types/offers';

interface IStateType {
  city: City;
  filtredOffers: Array<IOffer>;
  offers: Array<IOffer>;
  sortMethod: SortMethod;
  loadingStatus: boolean;
  authorizationStatus: AuthorizationStatus;
}

const initialState: IStateType = {
  city: City.Paris,
  filtredOffers: [],
  offers: [],
  sortMethod: SortMethod.Popular,
  loadingStatus: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const mainReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setFiltredOffers, (state, action) => {
      state.filtredOffers = state.offers.filter(
        (country) => country.city.name === action.payload
      );
    })
    .addCase(setAllOffers, (state, action) => {
      state.offers = [...action.payload];
    })
    .addCase(setSortMethod, (state, action) => {
      state.sortMethod = action.payload;

      switch (action.payload) {
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
    })
    .addCase(setLoading, (state, action) => {
      state.loadingStatus = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
