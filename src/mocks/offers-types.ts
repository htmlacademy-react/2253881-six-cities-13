interface ILocation {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface ICity {
  name: string;
  location: ILocation;
}

export interface IOffer {
  id: string;
  title: string;
  type: string;
  price: number;
  city: ICity;
  location: ILocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}
