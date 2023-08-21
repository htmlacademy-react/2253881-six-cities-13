import React from 'react';
import classNames from 'classnames';
import MemoizedCitiesMavigation from '../cities-navigation/cities-navigation';
import ListAndMap from '../list-and-map/list-and-map';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getFiltredOffers } from '../../store/offers-slice/selectors-offers';

const MainPageContent: React.FC = () => {
  const filtredOffers = useAppSelector(getFiltredOffers);

  return (
    <main
      className={classNames('page__main', 'page__main--index', {
        'page__main--index-empty': filtredOffers.length,
      })}
    >
      <h1 className="visually-hidden">Cities</h1>
      <MemoizedCitiesMavigation />
      <ListAndMap />
    </main>
  );
};

export default MainPageContent;
