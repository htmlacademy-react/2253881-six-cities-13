import React, { useEffect } from 'react';
import Header from '../../components/header/header';
import FooterFavourite from '../../components/footer-favourite/footer-favourite';
import FavoriteList from '../../components/favourite-list/favourite-list';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchOffersAction } from '../../store/api-actions';

const FavoritesScreen: React.FC = () => {
  const offers = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.city);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!offers.length) {
      dispatch(fetchOffersAction(activeCity));
    }
  }, [dispatch, activeCity, offers]);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoriteList offers={offers} />
          </section>
        </div>
      </main>
      <FooterFavourite />
    </div>
  );
};

export default FavoritesScreen;
