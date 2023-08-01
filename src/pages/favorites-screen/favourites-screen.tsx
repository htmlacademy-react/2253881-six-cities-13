import React, { useEffect } from 'react';
import Header from '../../components/header/header';
import FooterFavourite from '../../components/footer-favourite/footer-favourite';
import FavoriteList from '../../components/favourite-list/favourite-list';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {
  getCurrentCity,
  getAllOffers,
} from '../../store/offers-slice/selectors-offers';
import { fetchOffersAction } from '../../store/offers-slice/async-offers-actions';

const FavoritesScreen: React.FC = () => {
  const offers = useAppSelector(getAllOffers);
  const activeCity = useAppSelector(getCurrentCity);

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
