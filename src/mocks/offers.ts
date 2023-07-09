import { IOffer } from './offers-types';

export const OFFERS: Array<IOffer> = [
  {
    id: '1',
    title: 'super nice',
    type: 'apartment',
    price: 888,
    city: {
      name: 'Boston',
      location: {
        latitude: 51.35514938496378,
        longitude: 5.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 51.35514938496378,
      longitude: 5.673877537499948,
      zoom: 3,
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
      name: 'Moskow',
      location: {
        latitude: 29.35514938496378,
        longitude: 8.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 29.35514938496378,
      longitude: 8.673877537499948,
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
      name: 'Piter',
      location: {
        latitude: 23.35514938496378,
        longitude: 92.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 23.35514938496378,
      longitude: 92.673877537499948,
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
      name: 'London',
      location: {
        latitude: 11.35514938496378,
        longitude: 7.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 11.35514938496378,
      longitude: 7.673877537499948,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: true,
    rating: 2,
    previewImage: 'img/apartment-02.jpg',
  },
];
