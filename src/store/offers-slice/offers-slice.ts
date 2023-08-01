import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffersAction } from './async-offers-actions';
import { City, SortMethod } from '../../consts';
import { IOffer } from '../../types/offers';

interface IOffersSlice {
  city: City;
  filtredOffers: Array<IOffer>;
  offers: Array<IOffer>;
  sortMethod: SortMethod;
  loadingStatus: boolean;
}

const initialState: IOffersSlice = {
  city: City.Paris,
  filtredOffers: [],
  offers: [],
  sortMethod: SortMethod.Popular,
  loadingStatus: false,
};

const offersSlice = createSlice({
  name: '@offers',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loadingStatus = action.payload;
    },
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setFiltredOffers: (state, action: PayloadAction<City>) => {
      state.filtredOffers = state.offers.filter(
        (country) => country.city.name === action.payload
      );
    },
    setAllOffers: (state, action: PayloadAction<Array<IOffer>>) => {
      state.offers = [...action.payload];
    },
    setSortMethod: (state, action: PayloadAction<SortMethod>) => {
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state) => {
        state.loadingStatus = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.loadingStatus = false;
        state.city = City.Paris;
        state.filtredOffers = [];
        state.offers = [];
      });
  },
});

export default offersSlice.reducer;

export const {
  setLoading,
  setCity,
  setAllOffers,
  setFiltredOffers,
  setSortMethod,
} = offersSlice.actions;
