import { AUTH_TOKEN_KEY_NAME } from '../consts';

export const getToken = (): string =>
  localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';

export const setToken = (token: string): void =>
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);

export const deleteToken = (): void =>
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
