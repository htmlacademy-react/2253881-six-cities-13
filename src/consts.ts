export const OFFERS_COUNT = 10;
export const COUNT_STARS = [1, 2, 3, 4, 5];

const MARKER_BASE_URL =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/';

export const URL_MARKER_DEFAULT = `${MARKER_BASE_URL}pin.svg`;

export const URL_MARKER_CURRENT = `${MARKER_BASE_URL}main-pin.svg`;

export const TILE_LAYER_ULR =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const enum Path {
  Main = '/',
  Favorite = 'favourite',
  Login = 'login',
  Offer = 'offer',
  NotFound = '*',
}

export const enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
