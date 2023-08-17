import { IOffer } from '../types/offers';
import { IUserLoginData } from '../types/user';
import { USER_DATA_KEY } from '../consts';

export const getRandomElemsFromArr = (
  arr: Array<IOffer>,
  count: number
): Array<IOffer> | never => {
  const result: Array<IOffer> = [];

  if (arr.length < count) {
    throw new Error('Error func, count shoul be bigger than arr length');
  }

  while (result.length < count) {
    const current = arr[Math.floor(Math.random() * arr.length)];

    if (!result.some((el) => el.id === current.id)) {
      result.push(current);
    }
  }

  return result;
};

export const setLocalUserData = (data: IUserLoginData) => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
};

export const getLocalUserData = (): IUserLoginData | void => {
  const data = localStorage.getItem(USER_DATA_KEY);

  if (data !== null) {
    return JSON.parse(data) as IUserLoginData;
  }
};

export const deleteLocalData = (): void => {
  localStorage.removeItem(USER_DATA_KEY);
};
