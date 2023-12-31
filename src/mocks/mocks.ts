import { datatype, date, name, internet, lorem } from 'faker';
import { IComment } from '../types/comments';
import { IOffer } from '../types/offers';
import { AuthorizationStatus, City, SortMethod } from '../consts';
import { TOneCurrentOffer } from '../types/offers';
import { createApi } from '../services/api';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { Action } from 'redux';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createApi>,
  Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export const makeCommets = (): Array<IComment> => {
  const result = new Array(5).fill(null).map(() => ({
    id: datatype.uuid(),
    date: date.past().toISOString(),
    user: {
      name: name.title(),
      avatarUrl: internet.avatar(),
      isPro: datatype.boolean(),
    },
    comment: lorem.text(),
    rating: Math.floor(Math.random() * (5 - 1) + 1),
  }));

  return result;
};

export const makeOffers = (): Array<IOffer> => {
  const arrayOfCitys = Object.values(City);

  const result = new Array(5).fill(null).map(() => ({
    id: datatype.uuid(),
    title: lorem.text(),
    type: name.title(),
    price: Math.floor(Math.random() * (5000 - 100) + 100),
    city: {
      name: arrayOfCitys[
        Math.floor(Math.random() * (arrayOfCitys.length - 0) + 0)
      ],
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: Math.floor(Math.random() * (5 - 1) + 1),
    previewImage: internet.avatar(),
  }));

  return result;
};

export const createOneCurrentOffer = (): TOneCurrentOffer => {
  const module = makeOffers()[0];

  const goods = new Array(Math.floor(Math.random() * (5 - 1) + 1))
    .fill(null)
    .map(() => name.title());
  const images = new Array(Math.floor(Math.random() * (5 - 1) + 1))
    .fill(null)
    .map(() => internet.avatar());

  return {
    ...module,
    description: lorem.text(),
    bedrooms: Math.floor(Math.random() * (5 - 1) + 1),
    goods: goods,
    host: {
      name: name.title(),
      avatarUrl: internet.avatar(),
      isPro: datatype.boolean(),
    },
    images: images,
    maxAdults: Math.floor(Math.random() * (5 - 1) + 1),
  };
};

export const makeFakeStore = (): State => ({
  user: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  comments: {
    comments: makeCommets(),
    error: false,
    isLoading: false,
  },
  offers: {
    city: City.Paris,
    filtredOffers: [...makeOffers()],
    offers: [...makeOffers()],
    sortMethod: SortMethod.Popular,
    loadingStatus: false,
    nearbyOffers: [...makeOffers()],
    favOffers: [...makeOffers()],
    currentOffer: null,
  },
  common: {
    statusLoading: false,
    statusError: null,
  },
});
