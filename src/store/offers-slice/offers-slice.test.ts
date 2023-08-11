import { describe } from 'vitest';
import {
  setLoading,
  setCity,
  setFiltredOffers,
  setAllOffers,
  setFavOffers,
  setSortMethod,
  setCurrentOffer,
  setNearbyOffers,
} from './offers-slice';
import offersSlice from './offers-slice';
import { IOffersSlice } from './offers-slice';
import { City, SortMethod } from '../../consts';
import { createOneCurrentOffer, makeOffers } from '../../mocks/mocks';
// import { fetchOffersAction } from './async-offers-actions';

describe('offers slice', () => {
  const state: IOffersSlice = {
    city: City.Paris,
    filtredOffers: [],
    offers: [],
    sortMethod: SortMethod.Popular,
    loadingStatus: false,
    nearbyOffers: [],
    favOfffers: [],
    currentOffer: null,
  };

  const offersMocks = makeOffers();

  const currentOffer = createOneCurrentOffer();

  it('should return base state on empty type action', () => {
    const result = offersSlice(state, { type: '' });

    expect(result).toEqual(state);
  });

  it('shoud set loading status', () => {
    const expectedState = { ...state, loadingStatus: true };

    const result = offersSlice(state, setLoading(true));

    expect(result).toEqual(expectedState);
  });

  it('set city', () => {
    const expectedState = { ...state, city: City.Cologne };

    const result = offersSlice(state, setCity(City.Cologne));

    expect(result).toEqual(expectedState);
  });

  it('set filtred offers', () => {
    const editedState = { ...state, offers: [...offersMocks] };

    const result = offersSlice(editedState, setFiltredOffers(City.Paris));

    expect(result.filtredOffers).toEqual(
      offersMocks.filter((el) => el.city.name === City.Paris)
    );
  });

  it('set all offers', () => {
    const expectedState = { ...state, offers: [...offersMocks] };

    const result = offersSlice(state, setAllOffers(offersMocks));

    expect(result).toEqual(expectedState);
  });

  it('set fav offers', () => {
    const expectedState = { ...state, favOfffers: [...offersMocks] };

    const result = offersSlice(state, setFavOffers(offersMocks));

    expect(result).toEqual(expectedState);
  });

  it('set sort method', () => {
    const editedState = {
      ...state,
      offers: [...offersMocks],
      filtredOffers: offersMocks.filter((el) => el.city.name === City.Paris),
    };

    const result = offersSlice(editedState, setSortMethod(SortMethod.ByRating));

    expect(result.filtredOffers).toEqual(
      [...editedState.filtredOffers].sort((a, b) => b.rating - a.rating)
    );

    const result2 = offersSlice(
      editedState,
      setSortMethod(SortMethod.HighToLow)
    );

    expect(result2.filtredOffers).toEqual(
      [...editedState.filtredOffers].sort((a, b) => b.price - a.price)
    );

    const result3 = offersSlice(
      editedState,
      setSortMethod(SortMethod.LowToHigh)
    );

    expect(result3.filtredOffers).toEqual(
      [...editedState.filtredOffers].sort((a, b) => a.price - b.price)
    );

    const result4 = offersSlice(editedState, setSortMethod(SortMethod.Popular));

    expect(result4.filtredOffers).toEqual(editedState.filtredOffers);
  });

  it('set current offer', () => {
    const result = offersSlice(state, setCurrentOffer(currentOffer));

    expect(result.currentOffer).toEqual(currentOffer);
  });

  it('set nearby offers', () => {
    const result = offersSlice(state, setNearbyOffers(offersMocks));

    expect(result.nearbyOffers).toEqual(offersMocks);
  });

  // it('set offers all thunk action', async () => {
  //   const offers = makeOffers();
  //   const dispatch = vitest.fn();
  //   const thunk = fetchOffersAction(City.Paris);
  // });
});
