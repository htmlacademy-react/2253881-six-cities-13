import React from 'react';
import FavouriteItem from '../favourite-item/favourite-item';
import { IOffer } from '../../types/offers';

interface IFavouriteListProps {
  offers: Array<IOffer>;
}

const FavoriteList: React.FC<IFavouriteListProps> = ({ offers }) => (
  <ul className="favorites__list">
    {offers.map((el) => (
      <FavouriteItem key={`${el.id + el.city.name + el.title}`} {...el} />
    ))}
  </ul>
);

export default FavoriteList;
