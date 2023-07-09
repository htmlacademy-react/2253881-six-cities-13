import { IComment } from './comments-types';

export const COMMETS: Array<IComment> = [
  {
    id: '1',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'nobody',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false,
    },
    comment: 'Bautiful place',
    rating: 0,
  },
  {
    id: '1',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'new body',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: true,
    },
    comment: ')()(((',
    rating: 1,
  },
  {
    id: '2',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Vasilyi Pupkin',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false,
    },
    comment: 'Classno',
    rating: 2,
  },
  {
    id: '3',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Jenya Erkin',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false,
    },
    comment: 'ne classno',
    rating: 7,
  },
];
