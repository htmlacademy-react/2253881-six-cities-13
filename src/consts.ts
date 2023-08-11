export const COUNT_STARS = [5, 4, 3, 2, 1];

export const USER_DATA_KEY = 'userData';

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const BASE_BACKEND_URL = 'https://13.design.pages.academy';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const TILE_LAYER_ULR =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const enum Path {
  Main = '/',
  Favorite = 'favourite',
  Login = 'login',
  Offer = 'offer',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum SortMethod {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  ByRating = 'Top rated first',
}

export enum APIRoute {
  Offers = '/six-cities/offers',
  Comments = '/six-cities/comments/',
  Login = '/six-cities/login',
  Logout = '/six-cities/logout',
  Favorite = '/six-cities/favorite',
}
