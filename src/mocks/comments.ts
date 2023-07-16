import { IComment } from './comments-types';

export const COMMENTS: Array<IComment> = [
  {
    id: '1',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'nobody',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    comment: 'Bautiful place',
    rating: 0,
  },
  {
    id: '1',
    date: '2019-01-08T14:13:56.569Z',
    user: {
      name: 'new body',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
    comment: ')()(((',
    rating: 1,
  },
  {
    id: '2',
    date: '2019-02-08T14:13:56.569Z',
    user: {
      name: 'Vasilyi Pupkin',
      avatarUrl: 'img/avatar-max.jpg',
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
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    comment: 'ne classno',
    rating: 7,
  },
];
