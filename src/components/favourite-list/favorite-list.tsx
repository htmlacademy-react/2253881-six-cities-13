import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import EmptyFavoritesList from '../empty-favorites-list/empty-favorites-list';
import FavouriteItem from '../favourite-item/favourite-item';
import {
  setCity,
  setFiltredOffers,
  setSortMethod,
} from '../../store/offers-slice/offers-slice';

import {
  getFavOffers,
  getLoadingStatus,
} from '../../store/offers-slice/selectors-offers';
import { Path, SortMethod } from '../../consts';
import { City } from '../../consts';
import styles from './favourite-list.module.css';

const FavoriteList: React.FC = () => {
  const dispatch = useAppDispatch();

  const favOffers = useAppSelector(getFavOffers);
  const isLoading = useAppSelector(getLoadingStatus);

  const onClickCitySpan = useCallback(
    (el: string) => () => {
      dispatch(setCity(el as City));
      dispatch(setFiltredOffers(el as City));
      dispatch(setSortMethod(SortMethod.Popular));
    },
    [dispatch]
  );

  if (isLoading) {
    return (
      <div className={styles.containerForLoader}>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="3"
          animationDuration="0.75"
          width="150"
          visible
        />
      </div>
    );
  }

  if (favOffers.length === 0 && !isLoading) {
    return <EmptyFavoritesList />;
  }

  const cityList = Array.from(new Set(favOffers.map((el) => el.city.name)));

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cityList.map((city) => (
          <li
            key={`uniq-city-name-fav-list${city}`}
            className="favorites__locations-items"
          >
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link
                  onClick={onClickCitySpan(city)}
                  className="locations__item-link"
                  to={Path.Main}
                >
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {favOffers
                .filter((offer) => offer.city.name === city)
                .map((el) => (
                  <FavouriteItem
                    key={`${el.id}-${el.city.name}-fav-item-of-list`}
                    {...el}
                  />
                ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FavoriteList;
