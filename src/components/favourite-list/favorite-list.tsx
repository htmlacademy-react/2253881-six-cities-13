import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import EmptyFavoritesList from '../empty-favorites-list/empty-favorites-list';
import FavouriteItem from '../favourite-item/favourite-item';
import { getToken } from '../../services/token';
import { BASE_BACKEND_URL, APIRoute, Path } from '../../consts';
import { IOffer } from '../../types/offers';
import styles from './favourite-list.module.css';

const FavoriteList: React.FC = () => {
  const [favOffers, setFavOffers] = useState<Array<IOffer>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const countRenderRef = useRef<number>(0);

  const downloadFavOffers = useCallback(async () => {
    const token = getToken();
    setIsLoading(true);
    const res = await axios.get<Array<IOffer>>(
      `${BASE_BACKEND_URL}${APIRoute.Favorite}`,
      {
        headers: { 'x-token': token },
      }
    );
    const { data } = res;

    setFavOffers(data);
    setIsLoading(false);
    countRenderRef.current = countRenderRef.current + 1;
  }, []);

  useEffect(() => {
    downloadFavOffers();
  }, [downloadFavOffers]);

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

  const cityList = Array.from(new Set(favOffers.map((el) => el.city.name)));

  if (favOffers.length === 0 && !isLoading && countRenderRef.current > 0) {
    return <EmptyFavoritesList />;
  }

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
                <Link className="locations__item-link" to={Path.Main}>
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
                    setFavOffers={setFavOffers}
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
