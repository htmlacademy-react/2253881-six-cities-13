import React from 'react';
import MainPageContent from '../../components/main-page-content/main-page-content';
import Header from '../../components/header/header';
import CitiesNavigation from '../../components/citys-navigation/citys-navigation';

import './main-screen.css';

const MainScreen: React.FC = () => (
  <div className="page page--gray page--main">
    <Header />
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesNavigation />
      <MainPageContent />
    </main>
  </div>
);
export default MainScreen;
