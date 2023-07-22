import { IOffer } from './offers-types';

export const OFFERS: Array<IOffer> = [
  {
    id: '1',
    title: 'super nice',
    type: 'apartment',
    price: 888,
    city: {
      name: 'Cologne',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: false,
    rating: 1,
    previewImage: 'img/apartment-01.jpg',
  },
  {
    id: '2',
    title: 'ultra beautiful',
    type: 'private room',
    price: 717,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4,
    previewImage: 'img/apartment-02.jpg',
  },
  {
    id: '3',
    title: 'ultra bad',
    type: 'apartment',
    price: 1337,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 0,
    previewImage: 'img/apartment-03.jpg',
  },
  {
    id: '4',
    title: 'moshnaya tema',
    type: 'apartment',
    price: 666,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: true,
    rating: 2,
    previewImage: 'img/apartment-02.jpg',
  },
];
