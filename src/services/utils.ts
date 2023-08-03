import { IOffer } from '../types/offers';

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
