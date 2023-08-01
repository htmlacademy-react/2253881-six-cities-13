import React from 'react';
import Header from '../../components/header/header';
import FooterFavourite from '../../components/footer-favourite/footer-favourite';
import FavoriteList from '../../components/favourite-list/favourite-list';

const FavoritesScreen: React.FC = () => (
  <div className="page">
    <Header />
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <FavoriteList />
      </div>
    </main>
    <FooterFavourite />
  </div>
);

export default FavoritesScreen;
