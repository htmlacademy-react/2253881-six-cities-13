import { State } from '../../types/state';

export const getCurrentCity = (state: State) => state.offers.city;

export const getFiltredOffers = (state: State) => state.offers.filtredOffers;

export const getAllOffers = (state: State) => state.offers.offers;

export const getLoadingStatus = (state: State) => state.offers.loadingStatus;

export const getSortMethod = (state: State) => state.offers.sortMethod;

export const getCurrentOffer = (state: State) => state.offers.currentOffer;

export const getNearbyOffers = (state: State) => state.offers.nearbyOffers;

export const getFavOffers = (state: State) => state.offers.favOffers;
