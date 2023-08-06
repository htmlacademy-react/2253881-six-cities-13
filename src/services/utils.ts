import { IOffer } from '../types/offers';
import { IUserLoginData } from '../types/user';

export const getRandomElemsFromArr = (arr: Array<IOffer>, count: number) => {
  const result: Array<IOffer> = [];

  while (result.length < count) {
    const current = arr[Math.floor(Math.random() * arr.length)];

    if (!result.some((el) => el.id === current.id)) {
      result.push(current);
    }
  }

  return result;
};

const userDataKey = 'userData';

export const setLocalUserData = (data: IUserLoginData) => {
  localStorage.setItem(userDataKey, JSON.stringify(data));
};

export const getLocalUserData = (): IUserLoginData | void => {
  const data = localStorage.getItem(userDataKey);

  if (data !== null) {
    return JSON.parse(data) as IUserLoginData;
  }
};
